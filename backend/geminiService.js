// Hardcoded rule-based complaint analysis
export async function analyzeComplaint(title, description) {
  console.log("Analyzing complaint with rule-based system...");

  const text = `${title} ${description}`.toLowerCase();

  // Define keyword mappings for categories
  const categoryKeywords = {
    Academic: ['exam', 'grade', 'course', 'assignment', 'class', 'study', 'academic', 'curriculum', 'syllabus', 'lecture', 'professor', 'teacher', 'student', 'education'],
    Infrastructure: ['building', 'classroom', 'lab', 'library', 'computer', 'wifi', 'internet', 'electricity', 'water', 'maintenance', 'repair', 'broken', 'facility'],
    Hostel: ['hostel', 'room', 'mess', 'food', 'accommodation', 'bed', 'bathroom', 'laundry', 'warden', 'residence'],
    Transport: ['bus', 'transport', 'parking', 'vehicle', 'traffic', 'commute', 'travel', 'shuttle'],
    Faculty: ['faculty', 'staff', 'administration', 'office', 'registration', 'admission', 'fee', 'payment', 'counseling'],
    Other: [] // Default category
  };

  // Define priority keywords
  const highPriorityKeywords = ['emergency', 'urgent', 'broken', 'dangerous', 'unsafe', 'health', 'medical', 'fire', 'theft', 'harassment', 'violence'];
  const mediumPriorityKeywords = ['delay', 'problem', 'issue', 'complaint', 'concern', 'inconvenience', 'maintenance', 'repair'];

  // Define spam/offensive keywords
  const spamKeywords = ['buy', 'sell', 'advertisement', 'promotion', 'spam', 'lottery', 'winner', 'free money', 'click here'];
  const offensiveKeywords = ['abuse', 'hate', 'racist', 'sexist', 'vulgar', 'insult', 'threat', 'harassment', 'inappropriate'];

  // Determine category
  let category = 'Other';
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      category = cat;
      break;
    }
  }

  // Determine priority
  let priority = 'Low';
  if (highPriorityKeywords.some(keyword => text.includes(keyword))) {
    priority = 'High';
  } else if (mediumPriorityKeywords.some(keyword => text.includes(keyword))) {
    priority = 'Medium';
  }

  // Check for spam
  const isSpam = spamKeywords.some(keyword => text.includes(keyword));

  // Check for offensive content
  const isOffensive = offensiveKeywords.some(keyword => text.includes(keyword));

  // Generate simple summary
  const summary = `Complaint regarding ${category.toLowerCase()} issues: ${title}`;

  const result = {
    priority,
    category,
    summary,
    isSpam,
    isOffensive
  };

  console.log("Rule-based analysis result:", result);
  return result;
}
