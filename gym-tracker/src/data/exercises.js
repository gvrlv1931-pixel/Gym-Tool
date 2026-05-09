export const MUSCLE_GROUPS = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'core', 'quads', 'hamstrings', 'glutes', 'calves', 'full body',
];

export const EQUIPMENT_TYPES = [
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'machine', label: 'Machine' },
  { value: 'cable', label: 'Cable' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'resistance_band', label: 'Resistance Band' },
];

export const EXERCISES = [
  // CHEST
  {
    id: 'bench_press', realName: 'Bench Press', codeName: 'The Chest Coffin',
    muscleGroups: ['chest', 'triceps', 'shoulders'], defaultEquipment: 'barbell',
    tagline: 'Lie down. Push sky. Get big.',
    instructions: 'Pinch shoulder blades, slight arch. Lower bar to chest, push up and slightly back. Elbows at 45–75°, not flared like a chicken.',
  },
  {
    id: 'incline_bench', realName: 'Incline Bench Press', codeName: 'Upper Crust Protocol',
    muscleGroups: ['chest', 'shoulders', 'triceps'], defaultEquipment: 'barbell',
    tagline: 'For when regular bench bruises your ego insufficiently.',
    instructions: 'Same as flat bench but 30–45° incline. Hits upper chest. Don\'t go steeper or you\'re just doing shoulders.',
  },
  {
    id: 'dumbbell_fly', realName: 'Dumbbell Fly', codeName: 'The Wingspan',
    muscleGroups: ['chest'], defaultEquipment: 'dumbbell',
    tagline: 'Hug an invisible tree. Gainfully.',
    instructions: 'Slight bend in elbows, keep it fixed throughout. Lower until stretch in chest, squeeze back up. Control the descent.',
  },
  {
    id: 'cable_fly', realName: 'Cable Fly', codeName: 'String Theory',
    muscleGroups: ['chest'], defaultEquipment: 'cable',
    tagline: 'Constant tension. Science.',
    instructions: 'Set cables at chest height. Step forward, lean slightly. Bring hands together in an arc. Squeeze hard at the end.',
  },
  {
    id: 'pushup', realName: 'Push-Up', codeName: 'Floor Negotiations',
    muscleGroups: ['chest', 'triceps', 'core'], defaultEquipment: 'bodyweight',
    tagline: 'Free. Available 24/7. No excuses.',
    instructions: 'Straight line from head to heels. Lower until chest touches floor. Full lockout at top. Stop doing half reps.',
  },
  {
    id: 'chest_press_machine', realName: 'Chest Press Machine', codeName: 'The Guided Missile',
    muscleGroups: ['chest', 'triceps'], defaultEquipment: 'machine',
    tagline: 'Training wheels. No shame in it.',
    instructions: 'Seat height so handles align with chest. Push straight out, full extension. Slow on the way back.',
  },
  // BACK
  {
    id: 'deadlift', realName: 'Deadlift', codeName: 'The Floor Punisher',
    muscleGroups: ['back', 'glutes', 'hamstrings', 'core'], defaultEquipment: 'barbell',
    tagline: 'Pick up heavy thing. Put down heavy thing. Transcend.',
    instructions: 'Bar over mid-foot. Hinge at hips, grip just outside knees. Drive floor away, keep bar against shins. Lock out at top. Do not round your spine.',
  },
  {
    id: 'pull_up', realName: 'Pull-Up', codeName: 'The Gravity Argument',
    muscleGroups: ['back', 'biceps'], defaultEquipment: 'bodyweight',
    tagline: 'Fight physics. Win occasionally.',
    instructions: 'Dead hang start, depress shoulders before pulling. Drive elbows down to hips. Chin over bar. Full hang between reps.',
  },
  {
    id: 'lat_pulldown', realName: 'Lat Pulldown', codeName: 'V-Shape Conspiracy',
    muscleGroups: ['back', 'biceps'], defaultEquipment: 'cable',
    tagline: 'Pull-up training wheels. Still works.',
    instructions: 'Lean slightly back, chest up. Pull bar to upper chest, drive elbows to hips. Don\'t lean back aggressively — this isn\'t rowing.',
  },
  {
    id: 'barbell_row', realName: 'Barbell Row', codeName: 'The Angry Penguin',
    muscleGroups: ['back', 'biceps', 'core'], defaultEquipment: 'barbell',
    tagline: 'Hinge over. Pull hard. Repeat.',
    instructions: 'Hinge to 45°, brace core. Pull bar to lower chest/navel. Drive elbows back and up. Don\'t bounce off your legs.',
  },
  {
    id: 'cable_row', realName: 'Seated Cable Row', codeName: 'Yacht Simulator',
    muscleGroups: ['back', 'biceps'], defaultEquipment: 'cable',
    tagline: 'Row row row your boat, gainfully.',
    instructions: 'Sit tall, slight chest forward lean. Pull to belly button, squeeze shoulder blades together at end. Return with control.',
  },
  {
    id: 'rdl', realName: 'Romanian Deadlift', codeName: 'The Dracula Bow',
    muscleGroups: ['hamstrings', 'glutes', 'back'], defaultEquipment: 'barbell',
    tagline: 'Bow like eastern European nobility.',
    instructions: 'Soft knee bend, fixed. Push hips back, lower bar down legs until hamstring stretch. Drive hips forward to stand. Keep back flat.',
  },
  // SHOULDERS
  {
    id: 'overhead_press', realName: 'Overhead Press', codeName: 'Sky Petition',
    muscleGroups: ['shoulders', 'triceps', 'core'], defaultEquipment: 'barbell',
    tagline: 'Push metal over your skull. Bold.',
    instructions: 'Grip just outside shoulders, bar on upper chest. Brace everything. Press straight up, lean through at lockout. Lower with control.',
  },
  {
    id: 'lateral_raise', realName: 'Lateral Raise', codeName: 'The Side Boulder Project',
    muscleGroups: ['shoulders'], defaultEquipment: 'dumbbell',
    tagline: 'Grow those side boulders.',
    instructions: 'Slight bend in elbows. Raise to shoulder height — no higher. Lead with your pinky. Don\'t shrug. Everyone uses too much weight here.',
  },
  {
    id: 'front_raise', realName: 'Front Raise', codeName: 'The Salute',
    muscleGroups: ['shoulders'], defaultEquipment: 'dumbbell',
    tagline: 'Salute to the gains gods.',
    instructions: 'Slight elbow bend. Raise straight ahead to eye level. Lower slowly. Alternate or both together — both work.',
  },
  {
    id: 'face_pull', realName: 'Face Pull', codeName: 'The Alien Extraction',
    muscleGroups: ['shoulders', 'back'], defaultEquipment: 'cable',
    tagline: 'Great for shoulder health. Actually.',
    instructions: 'Cable at face height. Pull rope to forehead, elbows flared high. External rotation at end. Light weight, high reps.',
  },
  {
    id: 'arnold_press', realName: 'Arnold Press', codeName: 'The Terminator Spin',
    muscleGroups: ['shoulders', 'triceps'], defaultEquipment: 'dumbbell',
    tagline: 'He\'ll be back. With bigger delts.',
    instructions: 'Start with dumbbells at chin, palms facing you. Rotate palms out as you press up. Reverse on the way down.',
  },
  // BICEPS
  {
    id: 'barbell_curl', realName: 'Barbell Curl', codeName: 'The Gun Show Opener',
    muscleGroups: ['biceps'], defaultEquipment: 'barbell',
    tagline: 'The classic. The peacock strut.',
    instructions: 'Elbows pinned to sides. Curl up without swinging. Squeeze at top. Lower slowly — that\'s half the work.',
  },
  {
    id: 'hammer_curl', realName: 'Hammer Curl', codeName: "Thor's Practice",
    muscleGroups: ['biceps'], defaultEquipment: 'dumbbell',
    tagline: 'Neutral grip. Hits the brachialis.',
    instructions: 'Neutral grip (thumbs up). Same as regular curl but don\'t rotate. Works brachialis which pushes the bicep up visually.',
  },
  {
    id: 'preacher_curl', realName: 'Preacher Curl', codeName: 'The Church of Bicep',
    muscleGroups: ['biceps'], defaultEquipment: 'machine',
    tagline: 'Thou shalt not cheat reps.',
    instructions: 'Arm fully supported, no swinging possible. Full extension at bottom. Slow negatives. The machine is specifically designed to stop your nonsense.',
  },
  {
    id: 'cable_curl', realName: 'Cable Curl', codeName: 'Electric Boogaloo',
    muscleGroups: ['biceps'], defaultEquipment: 'cable',
    tagline: 'Constant tension. Consistent gainz.',
    instructions: 'Low pulley. Same mechanics as barbell curl but tension is maintained at the bottom. Great finishing move.',
  },
  // TRICEPS
  {
    id: 'tricep_dip', realName: 'Tricep Dip', codeName: 'The Descent',
    muscleGroups: ['triceps', 'chest', 'shoulders'], defaultEquipment: 'bodyweight',
    tagline: 'Go down. Come back. That\'s it.',
    instructions: 'Upright torso for more tricep. Hands slightly wider than shoulders. Full lock at top, controlled descent. Add weight when this gets easy.',
  },
  {
    id: 'skull_crusher', realName: 'Skull Crusher', codeName: 'Cranium Risk Management',
    muscleGroups: ['triceps'], defaultEquipment: 'barbell',
    tagline: 'Don\'t. Drop. The bar.',
    instructions: 'Lying down, bar/dumbbells over forehead. Hinge only at elbows. Lower toward forehead (or top of head if you want to live dangerously). Extend back up.',
  },
  {
    id: 'tricep_pushdown', realName: 'Tricep Pushdown', codeName: 'The Silencer',
    muscleGroups: ['triceps'], defaultEquipment: 'cable',
    tagline: 'Silence the horse shoes.',
    instructions: 'Elbows pinned to sides throughout. Push down to full extension, squeeze. Don\'t let elbows drift forward. Control the cable back up.',
  },
  {
    id: 'overhead_tricep', realName: 'Overhead Tricep Extension', codeName: 'The Halo Grind',
    muscleGroups: ['triceps'], defaultEquipment: 'dumbbell',
    tagline: 'Maximum stretch. Maximum pain.',
    instructions: 'One or two hands, dumbbell behind head. Elbows pointed up, hinge only at elbow. Full extension. Great long-head activation.',
  },
  // CORE
  {
    id: 'plank', realName: 'Plank', codeName: 'The Existential Hold',
    muscleGroups: ['core'], defaultEquipment: 'bodyweight',
    tagline: 'Stay still. Question your choices.',
    instructions: 'Forearms down, straight line head to heels. Squeeze glutes and abs. Don\'t let hips sag or pike. Breathe.',
  },
  {
    id: 'crunch', realName: 'Crunch', codeName: 'The Spine Accordion',
    muscleGroups: ['core'], defaultEquipment: 'bodyweight',
    tagline: 'Classic. Overrated. Still doing it.',
    instructions: 'Hands behind head, don\'t pull neck. Crunch shoulder blades off floor. Lower back stays down. It\'s a small movement.',
  },
  {
    id: 'leg_raise', realName: 'Hanging Leg Raise', codeName: 'The Bat Protocol',
    muscleGroups: ['core'], defaultEquipment: 'bodyweight',
    tagline: 'Hang. Raise. Feel superior.',
    instructions: 'Dead hang, no swinging. Raise legs to 90° (or higher). Lower slowly. If straight legs are too hard, bend knees.',
  },
  {
    id: 'ab_rollout', realName: 'Ab Wheel Rollout', codeName: 'The Core Implosion',
    muscleGroups: ['core'], defaultEquipment: 'bodyweight',
    tagline: 'Roll out. Regret. Roll back.',
    instructions: 'From knees, roll forward as far as you can without losing back position. Abs pull you back. Harder than it looks. Much harder.',
  },
  // QUADS
  {
    id: 'squat', realName: 'Barbell Squat', codeName: 'The Throne of Pain',
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'core'], defaultEquipment: 'barbell',
    tagline: 'Sit. Stand. Suffer. Repeat.',
    instructions: 'Bar on traps, brace hard. Break hips and knees together. Go below parallel. Drive through heels, knees track toes. Stand up.',
  },
  {
    id: 'leg_press', realName: 'Leg Press', codeName: 'The Lazy Throne',
    muscleGroups: ['quads', 'glutes', 'hamstrings'], defaultEquipment: 'machine',
    tagline: 'Squat, but sitting. Still counts.',
    instructions: 'Feet shoulder-width on platform. Lower until 90° knees. Drive through whole foot. Don\'t lock out aggressively. Don\'t let knees cave.',
  },
  {
    id: 'lunge', realName: 'Lunge', codeName: 'The Walk of Shame',
    muscleGroups: ['quads', 'glutes', 'hamstrings'], defaultEquipment: 'bodyweight',
    tagline: 'Walk slowly. Suffer loudly.',
    instructions: 'Step forward, lower back knee toward floor. Front shin vertical. Push back up through front heel. Alternate legs.',
  },
  {
    id: 'leg_extension', realName: 'Leg Extension', codeName: 'The Knee Toaster',
    muscleGroups: ['quads'], defaultEquipment: 'machine',
    tagline: 'Quad isolation. Your orthopaedist\'s favourite.',
    instructions: 'Adjust pad above ankles. Extend to lockout, squeeze hard at top. Lower slowly. Avoid if knees are unhappy.',
  },
  {
    id: 'goblet_squat', realName: 'Goblet Squat', codeName: 'Chalice of Suffering',
    muscleGroups: ['quads', 'glutes', 'core'], defaultEquipment: 'kettlebell',
    tagline: 'Hold the sacred weight. Squat.',
    instructions: 'Hold kettlebell at chest. Squat deep, elbows inside knees. Great for learning squat mechanics. Counterbalance helps depth.',
  },
  // GLUTES / HAMSTRINGS
  {
    id: 'hip_thrust', realName: 'Hip Thrust', codeName: 'The Glute Sermon',
    muscleGroups: ['glutes', 'hamstrings'], defaultEquipment: 'barbell',
    tagline: 'Science says best glute exercise. Science is right.',
    instructions: 'Upper back on bench, bar across hips. Drive hips up until parallel to floor. Squeeze glutes hard at top. Don\'t hyperextend your back.',
  },
  {
    id: 'leg_curl', realName: 'Leg Curl', codeName: 'The Hamstring Handshake',
    muscleGroups: ['hamstrings'], defaultEquipment: 'machine',
    tagline: 'Show your hamstrings some attention.',
    instructions: 'Lying: curl fully up, squeeze. Seated: more ROM, generally better. Control the extension. Both work — use whatever\'s available.',
  },
  {
    id: 'glute_bridge', realName: 'Glute Bridge', codeName: 'The Booty Overture',
    muscleGroups: ['glutes', 'hamstrings'], defaultEquipment: 'bodyweight',
    tagline: 'Hip thrust but floor-level. Gateway drug.',
    instructions: 'Feet flat on floor, knees bent. Drive hips straight up, squeeze glutes hard at top. Hold 1 sec. Lower. Add barbell when easy.',
  },
  // CALVES
  {
    id: 'calf_raise', realName: 'Calf Raise', codeName: 'The Tippy-Toe Protocol',
    muscleGroups: ['calves'], defaultEquipment: 'machine',
    tagline: 'Either genetics blessed you or they didn\'t.',
    instructions: 'Full range of motion is everything. Stretch all the way down, full rise on toes. Slow. High reps. Still might not grow. Such is life.',
  },
  // FULL BODY
  {
    id: 'burpee', realName: 'Burpee', codeName: 'The Punishment Cycle',
    muscleGroups: ['full body'], defaultEquipment: 'bodyweight',
    tagline: 'Satan\'s favourite exercise.',
    instructions: 'Stand, drop to plank, chest to floor, push up, jump feet to hands, jump up. Repeat until you question your decisions.',
  },
  {
    id: 'kettlebell_swing', realName: 'Kettlebell Swing', codeName: 'The Iron Pendulum',
    muscleGroups: ['glutes', 'hamstrings', 'core', 'back'], defaultEquipment: 'kettlebell',
    tagline: 'Swing the cannonball. Feel powerful.',
    instructions: 'Hinge pattern, not a squat. Drive hips forward explosively — the arms just guide. Let it swing to chest height. Control the descent back between legs.',
  },
  {
    id: 'clean_press', realName: 'Clean & Press', codeName: 'The Full Send',
    muscleGroups: ['full body', 'shoulders', 'back'], defaultEquipment: 'barbell',
    tagline: 'Two exercises. One movement. Full commitment.',
    instructions: 'Deadlift pull, shrug and catch at shoulders (clean), then press overhead. Technical — watch some form videos before loading heavy.',
  },
];

export const HOW_IT_FELT = [
  { value: 'destroyed', emoji: '💀', label: 'Destroyed me' },
  { value: 'brutal', emoji: '😤', label: 'Brutal' },
  { value: 'solid', emoji: '💪', label: 'Solid session' },
  { value: 'meh', emoji: '😐', label: 'Meh. Showed up' },
  { value: 'easy', emoji: '😴', label: 'Too easy' },
  { value: 'pr', emoji: '🔥', label: 'PR vibes' },
];
