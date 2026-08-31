import { Patient } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT-8942',
    name: 'Eleanor Rigby',
    age: 72,
    gender: 'Female',
    phone: '+1 (555) 234-8901',
    procedure: 'Total Knee Replacement (Right)',
    dischargeDate: '2026-08-25',
    attendingPhysician: 'Dr. Robert Vance, MD',
    careTeam: 'Orthopedic Surgery Team B',
    status: 'Needs Attention',
    flaggedReason: 'Pain score 8/10, severe swelling reported around surgical incision',
    lastCallDate: 'Today, 09:15 AM',
    history: [
      {
        id: 'CALL-101',
        callNumber: 2,
        day: 'Day 3 Check-in',
        date: 'Aug 28, 2026 • 09:15 AM',
        status: 'Needs Attention',
        flaggedReason: 'Pain score 8/10, severe swelling reported around surgical incision',
        duration: '3m 42s',
        summary: 'Patient reported elevated pain (8/10) despite prescribed Oxycodone. Mild redness and localized swelling behind right knee noted. Patient unable to bend knee beyond 30 degrees. AI flagged for immediate triage callback.',
        transcript: [
          { sender: 'ai', text: 'Hello Mrs. Rigby, this is Aftercare following up from St. Jude Memorial regarding your right knee replacement on Tuesday. How are you feeling today?', timestamp: '09:15:02' },
          { sender: 'patient', text: 'To be honest, the pain has gotten quite bad today. It feels throbbing and hot.', timestamp: '09:15:15' },
          { sender: 'ai', text: 'I am sorry to hear that. On a scale of 1 to 10, how would you rate your pain right now?', timestamp: '09:15:22' },
          { sender: 'patient', text: 'It is definitely an 8. The pain medication isn\'t taking it away like yesterday.', timestamp: '09:15:31' },
          { sender: 'ai', text: 'Thank you for sharing that. Have you noticed any unusual swelling, redness, or fluid drainage near your knee incision?', timestamp: '09:15:40' },
          { sender: 'patient', text: 'Yes, there is quite a bit of swelling around the calf and knee, and it feels warm to touch.', timestamp: '09:15:52' },
          { sender: 'ai', text: 'I understand. Because of your pain level and swelling, I am flagging this check-in for your clinical team immediately. Nurse Sarah will call you back within 30 minutes. Please rest and keep your leg elevated.', timestamp: '09:16:08' }
        ]
      },
      {
        id: 'CALL-100',
        callNumber: 1,
        day: 'Day 1 Check-in',
        date: 'Aug 26, 2026 • 10:30 AM',
        status: 'Normal',
        duration: '2m 15s',
        summary: 'Initial post-discharge call. Patient resting comfortably at home. Pain controlled at 3/10 with ice packs and prescribed regimen. Mobilizing with walker as instructed.',
        transcript: [
          { sender: 'ai', text: 'Hello Mrs. Rigby, this is your Day 1 post-discharge check-in from St. Jude Memorial. How was your first night at home?', timestamp: '10:30:04' },
          { sender: 'patient', text: 'It went well! Slept alright and keeping ice on the knee.', timestamp: '10:30:16' },
          { sender: 'ai', text: 'Wonderful. What is your current pain score on a 1 to 10 scale?', timestamp: '10:30:22' },
          { sender: 'patient', text: 'About a 3 out of 10. Very manageable.', timestamp: '10:30:28' },
          { sender: 'ai', text: 'That is great news. Keep up with your physical therapy exercises as prescribed. We will check back in 2 days.', timestamp: '10:30:35' }
        ]
      }
    ]
  },
  {
    id: 'PT-4410',
    name: 'James Holden',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 789-0123',
    procedure: 'Laparoscopic Cholecystectomy',
    dischargeDate: '2026-08-27',
    attendingPhysician: 'Dr. Elena Rostova, MD',
    careTeam: 'General Surgery Team A',
    status: 'Needs Attention',
    flaggedReason: 'Nausea, low-grade fever (100.8°F), unable to keep fluids down',
    lastCallDate: 'Today, 11:40 AM',
    history: [
      {
        id: 'CALL-102',
        callNumber: 1,
        day: 'Day 1 Check-in',
        date: 'Aug 28, 2026 • 11:40 AM',
        status: 'Needs Attention',
        flaggedReason: 'Nausea, low-grade fever (100.8°F), unable to keep fluids down',
        duration: '3m 10s',
        summary: 'Patient reported persistent abdominal discomfort, inability to tolerate oral fluids, and oral temperature of 100.8°F. AI escalated to surgical floor triage.',
        transcript: [
          { sender: 'ai', text: 'Hello Mr. Holden, this is Aftercare checking in after your gallbladder surgery yesterday. How are you feeling today?', timestamp: '11:40:02' },
          { sender: 'patient', text: 'Not great. I\'m feeling really nauseous and threw up twice this morning.', timestamp: '11:40:14' },
          { sender: 'ai', text: 'I am sorry to hear that. Are you able to keep water or clear liquids down right now?', timestamp: '11:40:21' },
          { sender: 'patient', text: 'No, even small sips make me sick. I also checked my temperature and it was 100.8 degrees.', timestamp: '11:40:33' },
          { sender: 'ai', text: 'Thank you for telling me. Given your fever and inability to keep fluids down, I am triggering an urgent alert to Dr. Rostova\'s surgical team. Someone will call you shortly.', timestamp: '11:40:48' }
        ]
      }
    ]
  },
  {
    id: 'PT-9031',
    name: 'Walter White',
    age: 52,
    gender: 'Male',
    phone: '+1 (555) 456-7890',
    procedure: 'Coronary Artery Bypass Graft (CABG)',
    dischargeDate: '2026-08-21',
    attendingPhysician: 'Dr. Michael Sterling, MD',
    careTeam: 'Cardiothoracic Surgery',
    status: 'Normal',
    lastCallDate: 'Yesterday, 04:20 PM',
    history: [
      {
        id: 'CALL-103',
        callNumber: 3,
        day: 'Day 7 Check-in',
        date: 'Aug 27, 2026 • 04:20 PM',
        status: 'Normal',
        duration: '2m 45s',
        summary: 'Sternal incision clean and dry. No shortness of breath. SBP 122/78, HR 72. Patient walking 15 minutes twice daily without fatigue.',
        transcript: [
          { sender: 'ai', text: 'Hello Mr. White, this is Aftercare for your 7-day post-bypass check-in. How is your chest incision feeling today?', timestamp: '16:20:01' },
          { sender: 'patient', text: 'Healing very nicely. The tightness is almost completely gone.', timestamp: '16:20:12' },
          { sender: 'ai', text: 'That is wonderful progress. Have you experienced any shortness of breath or dizziness when walking?', timestamp: '16:20:19' },
          { sender: 'patient', text: 'None at all. Did my 15-minute walk around the block this morning.', timestamp: '16:20:26' },
          { sender: 'ai', text: 'Excellent work. Your cardiac rehabilitation tracking is right on schedule.', timestamp: '16:20:34' }
        ]
      },
      {
        id: 'CALL-104',
        callNumber: 2,
        day: 'Day 3 Check-in',
        date: 'Aug 24, 2026 • 02:15 PM',
        status: 'Normal',
        duration: '2m 30s',
        summary: 'Vital signs within normal limits. Mild chest wall soreness managed with Tylenol. Sternal splinting technique used when coughing.',
        transcript: [
          { sender: 'ai', text: 'Hello Mr. White, Day 3 check-in from St. Jude Cardiac Care. Are you experiencing any sudden shortness of breath?', timestamp: '14:15:05' },
          { sender: 'patient', text: 'No shortness of breath. Just a bit sore when coughing, but using the heart pillow.', timestamp: '14:15:18' }
        ]
      }
    ]
  },
  {
    id: 'PT-1298',
    name: 'Sarah Connor',
    age: 38,
    gender: 'Female',
    phone: '+1 (555) 321-6549',
    procedure: 'Lumbar Microdiscectomy',
    dischargeDate: '2026-08-24',
    attendingPhysician: 'Dr. Marcus Wright, MD',
    careTeam: 'Neurosurgery Department',
    status: 'Normal',
    lastCallDate: 'Aug 27, 2026',
    history: [
      {
        id: 'CALL-105',
        callNumber: 2,
        day: 'Day 3 Check-in',
        date: 'Aug 27, 2026 • 01:10 PM',
        status: 'Normal',
        duration: '2m 05s',
        summary: 'Radicular leg pain resolved (0/10). Surgical site dry. Patient following lifting restrictions (<10 lbs).',
        transcript: [
          { sender: 'ai', text: 'Hi Sarah, Aftercare checking in after your back procedure. How is the nerve pain down your left leg?', timestamp: '13:10:02' },
          { sender: 'patient', text: 'The leg pain is completely gone! I am so relieved.', timestamp: '13:10:11' },
          { sender: 'ai', text: 'That is fantastic. Remember no bending, lifting over 10 pounds, or twisting for 4 weeks.', timestamp: '13:10:19' }
        ]
      }
    ]
  },
  {
    id: 'PT-6602',
    name: 'Arthur Pendelton',
    age: 81,
    gender: 'Male',
    phone: '+1 (555) 987-6543',
    procedure: 'Transcatheter Aortic Valve Replacement (TAVR)',
    dischargeDate: '2026-08-28',
    attendingPhysician: 'Dr. Jonathan Hayes, MD',
    careTeam: 'Structural Heart Clinic',
    status: 'Pending',
    lastCallDate: 'Scheduled today 4:00 PM',
    history: []
  },
  {
    id: 'PT-3319',
    name: 'Maria Santos',
    age: 61,
    gender: 'Female',
    phone: '+1 (555) 654-3210',
    procedure: 'Total Hip Arthroplasty (Left)',
    dischargeDate: '2026-08-22',
    attendingPhysician: 'Dr. Robert Vance, MD',
    careTeam: 'Orthopedic Surgery Team A',
    status: 'Normal',
    lastCallDate: 'Aug 25, 2026',
    history: [
      {
        id: 'CALL-106',
        callNumber: 2,
        day: 'Day 3 Check-in',
        date: 'Aug 25, 2026 • 03:45 PM',
        status: 'Normal',
        duration: '2m 50s',
        summary: 'Hip mobility improving. Pain score 2/10. Taking blood thinners as prescribed with no bruising or bleeding complications.',
        transcript: [
          { sender: 'ai', text: 'Hello Mrs. Santos, Aftercare following up on your left hip replacement. Are you taking your blood thinner medication daily?', timestamp: '15:45:04' },
          { sender: 'patient', text: 'Yes, every morning with breakfast. Pain is very low today, around a 2.', timestamp: '15:45:15' }
        ]
      }
    ]
  }
];
