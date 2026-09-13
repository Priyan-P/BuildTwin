const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Utility = require('../models/Utility');
const ProjectVersion = require('../models/ProjectVersion');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getDbState } = require('../config/db');
const {
  mockProjects,
  mockUtilities,
  mockVersions,
  mockUsers
} = require('../utils/mockStore');

// Helper to generate unique project ID
const generateProjectId = async (useMock) => {
  const year = new Date().getFullYear();
  let count = 1;
  if (useMock) {
    count = mockProjects.length + 1;
  } else {
    count = (await Project.countDocuments()) + 1;
  }
  const padded = String(count).padStart(4, '0');
  return `BT-${year}-${padded}`;
};

// @route   GET /api/projects
router.get('/', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const role = req.user.role;
    const userId = (req.user._id || req.user.id).toString();

    if (dbState.useMockStore) {
      let filtered = [...mockProjects];
      if (role === 'client') {
        filtered = mockProjects.filter(p => p.clientId.toString() === userId);
      } else if (role === 'designer') {
        filtered = mockProjects.filter(p => p.designerId && p.designerId.toString() === userId);
      }
      return res.json({ success: true, count: filtered.length, projects: filtered });
    }

    let query = {};
    if (role === 'client') {
      query.clientId = req.user._id;
    } else if (role === 'designer') {
      query.designerId = req.user._id;
    }

    const projects = await Project.find(query)
      .populate('clientId', 'name email phone')
      .populate('designerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/projects/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;
    const role = req.user.role;
    const userId = (req.user._id || req.user.id).toString();

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      if (!proj) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      // Security check
      if (role === 'client' && proj.clientId.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this project' });
      }
      if (role === 'designer' && proj.designerId && proj.designerId.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this project' });
      }

      const clientObj = mockUsers.find(u => u._id.toString() === proj.clientId.toString());
      const designerObj = proj.designerId ? mockUsers.find(u => u._id.toString() === proj.designerId.toString()) : null;

      const projectData = {
        ...proj,
        clientId: clientObj ? { _id: clientObj._id, name: clientObj.name, email: clientObj.email, phone: clientObj.phone } : proj.clientId,
        designerId: designerObj ? { _id: designerObj._id, name: designerObj.name, email: designerObj.email, phone: designerObj.phone } : null
      };

      return res.json({ success: true, project: projectData });
    }

    let project = await Project.findById(id)
      .populate('clientId', 'name email phone')
      .populate('designerId', 'name email phone');

    if (!project) {
      project = await Project.findOne({ projectId: id })
        .populate('clientId', 'name email phone')
        .populate('designerId', 'name email phone');
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Role Guard
    if (role === 'client' && project.clientId._id.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this project' });
    }
    if (role === 'designer' && project.designerId && project.designerId._id.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this project' });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/projects (Client books project)
router.post('/', protect, upload.single('blueprint'), async (req, res) => {
  try {
    const {
      projectName,
      buildingType,
      floors,
      area,
      location,
      constructionStage,
      services,
      description
    } = req.body;

    if (!projectName) {
      return res.status(400).json({ success: false, message: 'Project name is required' });
    }

    const parsedServices = typeof services === 'string' ? JSON.parse(services) : (services || []);
    const dbState = getDbState();
    const userId = req.user._id || req.user.id;
    const projectId = await generateProjectId(dbState.useMockStore);

    let blueprintFileObj = {
      filename: '',
      originalName: '',
      path: '',
      fileType: '',
      size: 0
    };

    if (req.file) {
      blueprintFileObj = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: `/uploads/blueprints/${req.file.filename}`,
        fileType: req.file.mimetype,
        size: req.file.size
      };
    } else {
      blueprintFileObj = {
        filename: 'sample_blueprint.pdf',
        originalName: 'Architectural_Plan_Submission.pdf',
        path: '/uploads/blueprints/sample_villa.pdf',
        fileType: 'application/pdf',
        size: 3500000
      };
    }

    if (dbState.useMockStore) {
      const newProj = {
        _id: 'proj_' + Date.now(),
        projectId,
        clientId: userId,
        designerId: null,
        projectName,
        buildingType: buildingType || 'Individual House',
        floors: Number(floors) || 1,
        area: Number(area) || 1000,
        location: location || '',
        constructionStage: constructionStage || 'Planning',
        services: parsedServices,
        description: description || '',
        blueprintFile: blueprintFileObj,
        status: 'Submitted',
        currentVersion: 'v1.0',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockProjects.unshift(newProj);
      return res.status(201).json({ success: true, project: newProj, message: 'Project request submitted successfully!' });
    }

    const project = await Project.create({
      projectId,
      clientId: userId,
      projectName,
      buildingType,
      floors: Number(floors) || 1,
      area: Number(area) || 1000,
      location,
      constructionStage,
      services: parsedServices,
      description,
      blueprintFile: blueprintFileObj,
      status: 'Submitted'
    });

    res.status(201).json({
      success: true,
      project,
      message: 'Project request submitted successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/projects/:id/status
router.put('/:id/status', protect, authorize('designer', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    const validStatuses = [
      'Submitted',
      'Under Review',
      'Approved',
      '3D Modeling',
      'Utility Mapping',
      'VR Development',
      'Client Review',
      'Revision',
      'Completed'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      if (!proj) return res.status(404).json({ success: false, message: 'Project not found' });
      proj.status = status;
      proj.updatedAt = new Date();
      return res.json({ success: true, project: proj, message: `Status updated to ${status}` });
    }

    const project = await Project.findByIdAndUpdate(id, { status, updatedAt: Date.now() }, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, project, message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/projects/:id/assign
router.put('/:id/assign', protect, authorize('admin'), async (req, res) => {
  try {
    const { designerId } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      if (!proj) return res.status(404).json({ success: false, message: 'Project not found' });
      proj.designerId = designerId;
      proj.updatedAt = new Date();
      return res.json({ success: true, project: proj, message: 'Designer assigned successfully' });
    }

    const project = await Project.findByIdAndUpdate(id, { designerId, updatedAt: Date.now() }, { new: true })
      .populate('designerId', 'name email phone');

    res.json({ success: true, project, message: 'Designer assigned successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/projects/:id/utilities (For 3D Digital Twin Viewer)
router.get('/:id/utilities', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      // Find matching project
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const utils = mockUtilities.filter(u => u.projectId.toString() === projId || u.projectId === id);
      return res.json({ success: true, count: utils.length, utilities: utils });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });

    const targetId = project ? project._id : id;
    const utilities = await Utility.find({ projectId: targetId });
    res.json({ success: true, count: utilities.length, utilities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/projects/:id/utilities
router.post('/:id/utilities', protect, authorize('designer', 'admin'), async (req, res) => {
  try {
    const { type, name, room, route, connectionPoint, description, status, coordinates } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (!type || !name || !room) {
      return res.status(400).json({ success: false, message: 'Type, name and room are required' });
    }

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const newUtil = {
        _id: 'util_' + Date.now(),
        utilityId: `UTIL-${type.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        projectId: projId,
        type,
        name,
        room,
        route: route || '',
        connectionPoint: connectionPoint || '',
        description: description || '',
        status: status || 'Active',
        coordinates: coordinates || { x: 0, y: 1, z: 0 }
      };
      mockUtilities.push(newUtil);
      return res.status(201).json({ success: true, utility: newUtil });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const utility = await Utility.create({
      utilityId: `UTIL-${type.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
      projectId: project._id,
      type,
      name,
      room,
      route,
      connectionPoint,
      description,
      status: status || 'Active',
      coordinates
    });

    res.status(201).json({ success: true, utility });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/projects/:id/versions
router.get('/:id/versions', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const versions = mockVersions.filter(v => v.projectId.toString() === projId);
      return res.json({ success: true, count: versions.length, versions });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });

    const targetId = project ? project._id : id;
    const versions = await ProjectVersion.find({ projectId: targetId }).sort({ createdAt: -1 });
    res.json({ success: true, count: versions.length, versions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/projects/:id/versions (Create new Project Version)
router.post('/:id/versions', protect, authorize('designer', 'admin'), async (req, res) => {
  try {
    const { versionNumber, changes, notes } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (!versionNumber || !changes) {
      return res.status(400).json({ success: false, message: 'Version number and changes description are required' });
    }

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const newVer = {
        _id: 'ver_' + Date.now(),
        versionId: `VER-${Date.now().toString().slice(-4)}`,
        projectId: projId,
        versionNumber,
        changes,
        notes: notes || '',
        createdByName: req.user.name,
        createdAt: new Date(),
        files: [{ name: `Twin_Model_${versionNumber}.gltf`, url: '#', type: '3d-model' }]
      };
      if (proj) {
        proj.currentVersion = versionNumber;
        proj.updatedAt = new Date();
      }
      mockVersions.unshift(newVer);
      return res.status(201).json({ success: true, version: newVer, message: `Created project version ${versionNumber}` });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const version = await ProjectVersion.create({
      versionId: `VER-${Date.now().toString().slice(-4)}`,
      projectId: project._id,
      versionNumber,
      changes,
      notes,
      createdBy: req.user._id,
      createdByName: req.user.name
    });

    project.currentVersion = versionNumber;
    await project.save();

    res.status(201).json({ success: true, version, message: `Created project version ${versionNumber}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
