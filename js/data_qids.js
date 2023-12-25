const qidsList = [
  [
    '1. FALLING ASLEEP:',
    {
      'I never take longer than 30 minutes to fall asleep': 0,
      'I take at least 30 minutes to fall asleep, less than half the time': 1,
      'I take at least 30 minutes to fall asleep, more than half the time.': 2,
      'I take more than 60 minutes to fall asleep, more than half the time': 3,
    },
  ],
  [
    '2.Sleep During the Night',
    {
      'I do not wake up at night': 0,
      'I have a restless, light sleep with a few brief awakenings each night': 1,
      'I wake up at least once a night, but I go back to sleep easily': 2,
      'I awaken more than once a night and stay awake for 20 minutes or more, more than half the time.': 3,
    },
  ],
  [
    '3.Waking Up Too Early?',
    {
      'Most of the time, I awaken no more than 30 minutes before I need to get up': 0,
      'More than half the time, I awaken more than 30 minutes before I need to get up': 1,
      'I almost always awaken at least one hour or so before I need to, but I go back to sleep eventually': 2,
      'I awaken at least one hour before I need to, and can not go back to sleep': 3,
    },
  ],
  [
    '4.Sleeping Too Much:',
    {
      'I sleep no longer than 7-8 hours/night, without napping during the day': 0,
      'I sleep no longer than 10 hours in a 24- hour period including naps': 1,
      'I sleep no longer than 12 hours in a 24- hour period including naps': 2,
      'I sleep longer than 12 hours in a 24-hour period including naps': 3,
    },
  ],
  [
    '5. Feeling Sad:',
    {
      'I do not feel sad': 0,
      'I feel sad less than half the time': 1,
      ' I feel sad more than half the time': 2,
      'I feel sad nearly all of the time': 3,
    },
  ],
  [
    '6. Decreased Appetite:',
    {
      'There is no change in my usual appetite': 0,
      'I eat somewhat less often or lesser amounts of food than usual': 1,
      'I eat much less than usual and only with personal effort': 2,
      'I rarely eat within a 24-hour period, and only with extreme personal effort or when others persuade me to eat.': 3,
    },
  ],
  [
    '7.Increased Appetite:',
    {
      'There is no change from my usual appetite': 0,
      'I feel a need to eat more frequently than usual': 1,
      'I regularly eat more often and/or greater amounts of food than usual': 2,
      'I feel driven to overeat both at mealtime and between meals': 3,
    },
  ],
  [
    '8.Decreased Weight (Within the Last Two Weeks):',
    {
      'I have not had a change in my weight': 0,
      "I feel as if I've had a slight weight loss": 1,
      'I have gained 2 pounds or more': 2,
      'I have gained 5 pounds or more': 3,
    },
  ],
  [
    '9. Increased Weight (Within the Last Two Weeks):',
    {
      'I have not had a change in my weight': 0,
      "I feel as if I've had a slight weight gain": 1,
      'I have gained 2 pounds or more': 2,
      'I have gained 5 pounds or more': 3,
    },
  ],
  [
    '10. Concentration/Decision Making:',
    {
      'There is no change in my usual capacity to concentrate or make decisions': 0,
      'I occasionally feel indecisive or find that my attention wanders': 1,
      'Most of the time, I struggle to focus my attention or to make decisions': 2,
      'I cannot concentrate well enough to read or cannot make even minor decisions': 3,
    },
  ],
  [
    '11. View of Myself:',
    {
      'I see myself as equally worthwhile and deserving as other people': 0,
      'I am more self-blaming than usual': 1,
      'I largely believe that I cause problems for others': 2,
      'I think almost constantly about major and minor defects in myself': 3,
    },
  ],
  [
    '12.Thoughts of Death or Suicide:',
    {
      'I do not think of suicide or death': 0,
      "I feel that life is empty or wonder if it's worth living": 1,
      'I think of suicide or death several time a week for several minutes': 2,
      'I think of suicide or death several times a day in some detail, or I have made specific plans for suicide or have actually tried to take my life.': 3,
    },
  ],
  [
    '13.General Interest:',
    {
      'There is no change from usual in how interested I am in other people or activities': 0,
      'I notice that I am less interested in people or activities': 1,
      'I find I have interest in only one or two of my formerly pursued activities': 2,
      'I have virtually no interest in formerly pursued activities': 3,
    },
  ],
  [
    '14.Energy Level:',
    {
      'There is no change in my usual level of energy': 0,
      'I get tired more easily than usual': 1,
      'I have to make a big effort to start or finish my usual daily activities': 2,
      "I really cannot carry out most of my usual daily activities because I just don't have the energy": 3,
    },
  ],
  [
    '15. Feeling slowed down:',
    {
      'I think, speak, and move at my usual rate of speed': 0,
      'I find that my thinking is slowed down or my voice sounds dull or flat': 1,
      "It takes me several seconds to respond to most questions and I'm sure my thinking is slowed": 2,
      'I am often unable to respond to questions without extreme effort': 3,
    },
  ],
  [
    '16.Feeling restless:',
    {
      'I do not feel restless': 0,
      "I'm often fidgety, wringing my hands, or need to shift how I am sitting't": 1,
      'I have impulses to move about and quite restless': 2,
      'At times, I am unable to stay seated and need to pace around': 3,
    },
  ],
];

export default qidsList;
