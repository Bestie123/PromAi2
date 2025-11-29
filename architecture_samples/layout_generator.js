// Auto-layout generator for architecture tree
const LAYOUT = {
  HORIZONTAL_SPACING: 1000,
  VERTICAL_SPACING: 500,
  QUESTION_Y: 100,
  ANSWER_Y: 300
};

function generateLayout(nodes) {
  const questions = nodes.filter(n => n.type === 'question');
  const answers = nodes.filter(n => n.type !== 'question');
  
  questions.forEach((q, i) => {
    q.x = 500 + i * LAYOUT.HORIZONTAL_SPACING;
    q.y = LAYOUT.QUESTION_Y + Math.floor(i / 5) * LAYOUT.VERTICAL_SPACING * 2;
  });
  
  answers.forEach(a => {
    const parent = questions.find(q => q.children.includes(a.id));
    if (parent) {
      const siblingIndex = parent.children.indexOf(a.id);
      const totalSiblings = parent.children.length;
      const offset = (siblingIndex - (totalSiblings - 1) / 2) * 600;
      a.x = parent.x + offset;
      a.y = parent.y + LAYOUT.ANSWER_Y;
    }
  });
  
  return nodes;
}

if (typeof module !== 'undefined') module.exports = { generateLayout };
