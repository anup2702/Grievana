// Test script for rule-based complaint analysis
import { analyzeComplaint } from './geminiService.js';

async function testRuleBasedAnalysis() {
  console.log('Testing Rule-Based Complaint Analysis...\n');

  // Test cases
  const testCases = [
    {
      title: 'Broken classroom projector',
      description: 'The projector in room 101 is not working and classes are affected',
      expectedCategory: 'Infrastructure',
      expectedPriority: 'Medium'
    },
    {
      title: 'Exam grading issue',
      description: 'My exam was graded incorrectly and I need it reviewed',
      expectedCategory: 'Academic',
      expectedPriority: 'Medium'
    },
    {
      title: 'Hostel room maintenance',
      description: 'The bathroom in my hostel room is leaking and needs repair',
      expectedCategory: 'Hostel',
      expectedPriority: 'Medium'
    },
    {
      title: 'Bus service delay',
      description: 'The college bus is always late and students are missing classes',
      expectedCategory: 'Transport',
      expectedPriority: 'Medium'
    },
    {
      title: 'Fee payment problem',
      description: 'I cannot pay my fees online and need assistance',
      expectedCategory: 'Faculty',
      expectedPriority: 'Medium'
    },
    {
      title: 'Emergency: Fire in lab',
      description: 'There is a fire in the chemistry lab and students are in danger',
      expectedCategory: 'Infrastructure',
      expectedPriority: 'High'
    },
    {
      title: 'Spam advertisement',
      description: 'Buy cheap laptops now! Limited time offer!',
      expectedCategory: 'Other',
      expectedPriority: 'Low',
      expectedSpam: true
    },
    {
      title: 'Offensive content',
      description: 'This is a hate speech and should not be allowed',
      expectedCategory: 'Other',
      expectedPriority: 'Low',
      expectedOffensive: true
    }
  ];

  for (const testCase of testCases) {
    console.log(`Testing: "${testCase.title}"`);
    console.log(`Description: "${testCase.description}"`);

    try {
      const result = await analyzeComplaint(testCase.title, testCase.description);

      console.log(`Result: Priority=${result.priority}, Category=${result.category}, Spam=${result.isSpam}, Offensive=${result.isOffensive}`);
      console.log(`Summary: ${result.summary}`);

      // Check expectations
      const categoryMatch = result.category === testCase.expectedCategory;
      const priorityMatch = result.priority === testCase.expectedPriority;
      const spamMatch = result.isSpam === (testCase.expectedSpam || false);
      const offensiveMatch = result.isOffensive === (testCase.expectedOffensive || false);

      if (categoryMatch && priorityMatch && spamMatch && offensiveMatch) {
        console.log('✅ PASS\n');
      } else {
        console.log('❌ FAIL');
        console.log(`Expected: Category=${testCase.expectedCategory}, Priority=${testCase.expectedPriority}, Spam=${testCase.expectedSpam || false}, Offensive=${testCase.expectedOffensive || false}`);
        console.log(`Actual: Category=${result.category}, Priority=${result.priority}, Spam=${result.isSpam}, Offensive=${result.isOffensive}\n`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}\n`);
    }
  }
}

// Run the test
testRuleBasedAnalysis().catch(console.error);
