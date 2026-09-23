const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const defaultPasswordHash = bcrypt.hashSync('client123', salt);
const adminPasswordHash = bcrypt.hashSync('admin123', salt);
const designerPasswordHash = bcrypt.hashSync('designer123', salt);

const mockUsers = [
  {
    _id: '65f1a0000000000000000001',
    name: 'Alex Mercer (Client)',
    email: 'client@buildtwin.demo',
    password: defaultPasswordHash,
    phone: '+1 (555) 234-5678',
    role: 'client',
    status: 'active',
    createdAt: new Date('2026-01-15')
  },
  {
    _id: '65f1a0000000000000000002',
    name: 'Elena Rostova (Lead Utility Designer)',
    email: 'designer@buildtwin.demo',
    password: designerPasswordHash,
    phone: '+1 (555) 876-5432',
    role: 'designer',
    status: 'active',
    specialization: 'Electrical & Plumbing Mapping',
    experience: '6 Years MEP Engineering',
    skills: ['3D Modeling', 'Electrical Routing', 'PEX Plumbing'],
    createdAt: new Date('2026-01-10')
  },
  {
    _id: '65f1a0000000000000000003',
    name: 'Marcus Sterling (System Administrator)',
    email: 'admin@buildtwin.demo',
    password: adminPasswordHash,
    phone: '+1 (555) 999-0000',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2026-01-01')
  },
  {
    _id: '65f1a0000000000000000004',
    name: 'David Vance (Applicant Designer)',
    email: 'pending.designer@buildtwin.demo',
    password: designerPasswordHash,
    phone: '+1 (555) 333-4444',
    role: 'designer',
    status: 'pending',
    specialization: 'VR Development & Gas Mapping',
    experience: '4 Years Architectural Tech',
    skills: ['VR Inspection', 'Piped Gas Lines'],
    createdAt: new Date('2026-03-10')
  }
];

const mockProjects = [
  {
    _id: '65f2b0000000000000000001',
    projectId: 'BT-2026-0001',
    clientId: '65f1a0000000000000000001',
    designerId: '65f1a0000000000000000002',
    projectName: 'Modern 3BHK Smart Villa',
    buildingType: 'Villa',
    floors: 2,
    area: 3400,
    location: 'Austin, Texas, USA',
    constructionStage: 'Framing & MEP Installation',
    services: [
      '3D Modeling',
      'Electrical Mapping',
      'Plumbing Mapping',
      'Gas Mapping',
      'Cable/Internet Mapping',
      'Appliance Connections',
      'VR Visualization',
      'Mobile Visualization',
      'Future Utility Documentation'
    ],
    description: 'High-end smart residential villa with comprehensive hidden utility tracking, solar integration routing, and automated HVAC duct mapping.',
    blueprintFile: {
      filename: 'villa_architectural_plan_v2.pdf',
      originalName: 'Villa_Blueprint_Final.pdf',
      path: '/uploads/blueprints/sample_villa.pdf',
      fileType: 'application/pdf',
      size: 4850000
    },
    status: 'Utility Mapping',
    currentVersion: 'v1.1',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-28')
  },
  {
    _id: '65f2b0000000000000000002',
    projectId: 'BT-2026-0002',
    clientId: '65f1a0000000000000000001',
    designerId: '65f1a0000000000000000002',
    projectName: 'Grand Horizon Commercial Center',
    buildingType: 'Commercial Building',
    floors: 4,
    area: 18500,
    location: 'Seattle, Washington, USA',
    constructionStage: 'Foundation & Core Structural',
    services: [
      '3D Modeling',
      'Electrical Mapping',
      'Plumbing Mapping',
      'VR Visualization'
    ],
    description: 'Multi-tenant commercial hub requiring heavy electrical conduit tracing and fire-suppression water distribution mapping.',
    blueprintFile: {
      filename: 'commercial_center_dwg.pdf',
      originalName: 'Commercial_Center_Plan.pdf',
      path: '/uploads/blueprints/sample_commercial.pdf',
      fileType: 'application/pdf',
      size: 12400000
    },
    status: 'VR Development',
    currentVersion: 'v1.0',
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-01')
  },
  {
    _id: '65f2b0000000000000000003',
    projectId: 'BT-2026-0003',
    clientId: '65f1a0000000000000000001',
    designerId: '65f1a0000000000000000002',
    projectName: 'AeroPark Modern Townhouse',
    buildingType: 'Individual House',
    floors: 3,
    area: 2800,
    location: 'Denver, Colorado, USA',
    constructionStage: 'Final Finish & Handover',
    services: [
      '3D Modeling',
      'Electrical Mapping',
      'Plumbing Mapping',
      'Appliance Connections',
      'Mobile Visualization'
    ],
    description: 'Fully archived digital twin complete with smart home fiber routes and radiant floor heating plumbing.',
    blueprintFile: {
      filename: 'townhouse_layout.pdf',
      originalName: 'Townhouse_Final.pdf',
      path: '/uploads/blueprints/sample_townhouse.pdf',
      fileType: 'application/pdf',
      size: 3200000
    },
    status: 'Completed',
    currentVersion: 'v2.0',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-02-20')
  }
];

const mockUtilities = [
  // Electrical
  {
    _id: '65f3c0000000000000000001',
    utilityId: 'UTIL-ELE-001',
    projectId: '65f2b0000000000000000001',
    type: 'electrical',
    name: 'Main Distribution Panel (DB-1)',
    room: 'Utility Room (Ground Floor)',
    route: 'Feeder Cable from Utility Pole -> Meter Box -> DB-1 Panel',
    connectionPoint: 'Main 200A Breaker Switch',
    description: 'Primary power distribution board supplying Ground & First Floor circuits with heavy surge protection.',
    status: 'Active',
    coordinates: { x: -3.2, y: 0.8, z: -2.5 }
  },
  {
    _id: '65f3c0000000000000000002',
    utilityId: 'UTIL-ELE-002',
    projectId: '65f2b0000000000000000001',
    type: 'electrical',
    name: 'Living Room Ceiling Recessed Array',
    room: 'Living Room',
    route: 'Conduit Wall Slot West Wall -> Ceiling Joist #4',
    connectionPoint: 'Dimmer Switch Box L-01',
    description: 'Embedded warm LED wiring harness with smart WiFi relay module embedded behind dry wall.',
    status: 'Active',
    coordinates: { x: 0.5, y: 2.8, z: 1.2 }
  },
  {
    _id: '65f3c0000000000000000003',
    utilityId: 'UTIL-ELE-003',
    projectId: '65f2b0000000000000000001',
    type: 'electrical',
    name: 'Master Bedroom Island Power Core',
    room: 'Master Bedroom (Floor 2)',
    route: 'Sub-panel DB-2 -> Floor Slab Conduit -> Bed Wall Sockets',
    connectionPoint: 'Quad Wall Socket Cluster',
    description: 'Shielded high-amperage copper conduit powering bedside controls & motorized curtains.',
    status: 'Active',
    coordinates: { x: 2.8, y: 5.2, z: -1.0 }
  },

  // Water / Plumbing
  {
    _id: '65f3c0000000000000000004',
    utilityId: 'UTIL-WAT-001',
    projectId: '65f2b0000000000000000001',
    type: 'water',
    name: 'Cold Water Main Supply Valve',
    room: 'Utility Room (Ground Floor)',
    route: 'City Line Municipal Water Meter -> Pressure Control Valve -> Main Riser Pipe',
    connectionPoint: 'Brass Ball Shutoff Valve V-101',
    description: 'Central cold water inflow with digital flow meter sensor for smart leak detection.',
    status: 'Active',
    coordinates: { x: -3.5, y: 0.4, z: -2.0 }
  },
  {
    _id: '65f3c0000000000000000005',
    utilityId: 'UTIL-WAT-002',
    projectId: '65f2b0000000000000000001',
    type: 'water',
    name: 'Master Ensuite Hot Water Manifold',
    room: 'Master Bathroom',
    route: 'Heat Pump Tank -> Ceiling Cavity Insulated PEX Line -> Shower Mixer',
    connectionPoint: 'Thermostatic Valve Body',
    description: 'Insulated red PEX-A hot water distribution loop preventing heat loss inside ceiling cavity.',
    status: 'Active',
    coordinates: { x: 3.2, y: 5.0, z: 2.1 }
  },
  {
    _id: '65f3c0000000000000000006',
    utilityId: 'UTIL-WAT-003',
    projectId: '65f2b0000000000000000001',
    type: 'water',
    name: 'Kitchen Main Drainage Line',
    room: 'Kitchen',
    route: 'Kitchen Island Sink -> 3" PVC Under-Slab Waste Pipe -> Outdoor Grease Trap',
    connectionPoint: 'Kitchen Drain P-Trap Connector',
    description: 'Sloped DWV PVC pipeline embedded 6 inches underneath the reinforced concrete ground slab.',
    status: 'Active',
    coordinates: { x: -1.2, y: 0.2, z: 2.8 }
  },

  // Gas
  {
    _id: '65f3c0000000000000000007',
    utilityId: 'UTIL-GAS-001',
    projectId: '65f2b0000000000000000001',
    type: 'gas',
    name: 'Piped Natural Gas Main Line',
    room: 'Outdoor North Wall',
    route: 'Gas Meter -> Steel Gas Riser -> Kitchen Wall Entry Pipe',
    connectionPoint: 'Emergency Shutoff Lever G-01',
    description: 'Yellow coated CSST flexible gas line routed under outer wall trim with safety cut-off solenoid.',
    status: 'Active',
    coordinates: { x: -4.0, y: 0.6, z: 1.5 }
  },

  // Cable / Internet
  {
    _id: '65f3c0000000000000000008',
    utilityId: 'UTIL-CAB-001',
    projectId: '65f2b0000000000000000001',
    type: 'cable',
    name: 'Fiber Optic Main Gateway Hub',
    room: 'Study Room',
    route: 'External Utility Trench -> Low Voltage Box -> Cat6 Patch Panel',
    connectionPoint: 'Structured Wiring Cabinet',
    description: 'Central telecom hub with multi-gigabit fiber drop, distributing Cat6 cabling to all ceiling APs.',
    status: 'Active',
    coordinates: { x: -2.0, y: 2.4, z: -3.0 }
  },

  // Appliance Connections
  {
    _id: '65f3c0000000000000000009',
    utilityId: 'UTIL-APP-001',
    projectId: '65f2b0000000000000000001',
    type: 'appliance',
    name: 'HVAC Multi-Split Condenser Feed',
    room: 'Roof & Master Suite',
    route: 'Roof Heat Pump Condenser -> Wall Chase Line Set -> Ceiling Air Handler',
    connectionPoint: 'Refrigerant Copper Line & 240V Power Box',
    description: 'High-efficiency dual refrigerant lines + condensation drain tube embedded within south wall exterior cavity.',
    status: 'Active',
    coordinates: { x: 1.8, y: 6.5, z: 0.0 }
  }
];

const mockVersions = [
  {
    _id: '65f4d0000000000000000001',
    versionId: 'VER-001',
    projectId: '65f2b0000000000000000001',
    versionNumber: 'v1.0',
    changes: 'Initial construction 3D model baseline creation and structural utility layer mapping setup.',
    files: [
      { name: 'Villa_Model_v1.0.gltf', url: '#', type: '3d-model' },
      { name: 'Utility_Blueprint_Doc.pdf', url: '#', type: 'pdf' }
    ],
    createdByName: 'Elena Rostova (Designer)',
    createdAt: new Date('2026-02-05'),
    notes: 'Base architectural blueprint imported. All wall cavities mapped for electrical conduit routes.'
  },
  {
    _id: '65f4d0000000000000000002',
    versionId: 'VER-002',
    projectId: '65f2b0000000000000000001',
    versionNumber: 'v1.1',
    changes: 'Kitchen electrical modification & Solar Roof inverter feeder cable rerouting.',
    files: [
      { name: 'Villa_Model_v1.1_Revised.gltf', url: '#', type: '3d-model' },
      { name: 'Kitchen_Electrical_Revision.pdf', url: '#', type: 'pdf' }
    ],
    createdByName: 'Elena Rostova (Designer)',
    createdAt: new Date('2026-02-25'),
    notes: 'Adjusted kitchen island socket locations to match revised client cabinetry blueprint.'
  }
];

const mockBookings = [
  {
    _id: '65f5e0000000000000000001',
    bookingId: 'BK-2026-901',
    clientId: '65f1a0000000000000000001',
    projectId: '65f2b0000000000000000001',
    clientName: 'Alex Mercer',
    clientEmail: 'client@buildtwin.demo',
    projectName: 'Modern 3BHK Smart Villa',
    date: '2026-09-18',
    time: '14:00 GMT',
    meetingType: 'Video Call',
    notes: 'Review 3D utility mapping progress and align on kitchen PEX plumbing routing.',
    status: 'Confirmed',
    createdAt: new Date('2026-09-10')
  }
];

const mockMessages = [
  {
    _id: '65f6f0000000000000000001',
    messageId: 'MSG-001',
    projectId: '65f2b0000000000000000001',
    senderId: '65f1a0000000000000000001',
    senderName: 'Alex Mercer (Client)',
    senderRole: 'client',
    message: 'Hello Elena! We have reviewed the initial electrical blueprint. Could we make sure the master bedroom bed headboard has dedicated low-voltage conduit for ambient LED strips?',
    attachments: [],
    createdAt: new Date('2026-02-12T10:15:00Z')
  },
  {
    _id: '65f6f0000000000000000002',
    messageId: 'MSG-002',
    projectId: '65f2b0000000000000000001',
    senderId: '65f1a0000000000000000002',
    senderName: 'Elena Rostova (Designer)',
    senderRole: 'designer',
    message: 'Hi Alex! Yes, absolutely. I have added a dedicated 12V DC conduit channel along joist #7 on Floor 2 and updated the model version to v1.1. You can inspect it directly in the 3D Twin Viewer!',
    attachments: [],
    createdAt: new Date('2026-02-12T11:30:00Z')
  }
];

const mockNotifications = [
  {
    _id: '65f7a0000000000000000001',
    userId: '65f1a0000000000000000001',
    title: 'Project Status Updated',
    message: 'Your project "Modern 3BHK Smart Villa" has moved to stage: Utility Mapping.',
    type: 'status',
    link: '/client/projects/65f2b0000000000000000001',
    isRead: false,
    createdAt: new Date('2026-02-28')
  },
  {
    _id: '65f7a0000000000000000002',
    userId: '65f1a0000000000000000001',
    title: 'Consultation Confirmed',
    message: 'Your video consultation with Lead Designer Elena Rostova is confirmed for Sept 18.',
    type: 'booking',
    link: '/client/dashboard',
    isRead: false,
    createdAt: new Date('2026-09-10')
  }
];

const mockContactMessages = [
  {
    _id: '65f8b0000000000000000001',
    name: 'David Vance',
    email: 'david.vance@architects-group.com',
    phone: '+1 (555) 444-3322',
    subject: 'Enterprise Partnership Inquiry for Multi-Story Towers',
    message: 'Our architecture firm designs 15-story residential towers. We are interested in licensing BuildTwin for digital utility record keeping across our portfolio.',
    createdAt: new Date('2026-03-01')
  }
];

module.exports = {
  mockUsers,
  mockProjects,
  mockUtilities,
  mockVersions,
  mockBookings,
  mockMessages,
  mockNotifications,
  mockContactMessages
};
