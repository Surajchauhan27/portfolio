import jsPDF from 'jspdf';

export function generateResumePDF() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const addPage = () => {
    doc.addPage();
    y = margin;
  };

  const checkY = (needed) => {
    if (y + needed > pageH - margin) addPage();
  };

  const sectionTitle = (title) => {
    checkY(14);
    doc.setFillColor(0, 180, 216);
    doc.rect(margin, y, contentW, 0.5, 'F');
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 180, 216);
    doc.text(title.toUpperCase(), margin, y);
    y += 6;
    doc.setTextColor(40, 40, 40);
  };

  const bodyText = (text, indent = 0, fontSize = 9.5) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, contentW - indent);
    checkY(lines.length * 5 + 2);
    doc.text(lines, margin + indent, y);
    y += lines.length * 5 + 2;
  };

  const bulletItem = (text, indent = 4) => {
    checkY(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text('•', margin + indent - 3, y);
    const lines = doc.splitTextToSize(text, contentW - indent - 2);
    doc.text(lines, margin + indent, y);
    y += lines.length * 5 + 1;
  };

  // ── HEADER ───────────────────────────────────────────────────────────────
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, pageW, 48, 'F');
  doc.setFillColor(0, 180, 216);
  doc.rect(0, 46, pageW, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(240, 246, 255);
  doc.text('Suraj Singh Chauhan', margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(0, 180, 216);
  doc.text('Research Analyst  |  Data Analyst  |  Open to Work', margin, 27);

  doc.setFontSize(8.5);
  doc.setTextColor(180, 200, 220);
  const contactItems = [
    'surajchauhan22281@gmail.com',
    'linkedin.com/in/codewithsuraj',
    'github.com/Surajchauhan27',
  ];
  doc.text(contactItems.join('   |   '), margin, 38);

  y = 56;

  // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
  sectionTitle('Professional Summary');
  bodyText(
    'BCA graduate and aspiring Research Analyst with hands-on experience in Python, Excel, and Power BI. ' + 
    'Passionate about data analysis, automation, and building intelligent tools that solve real-world problems.'
  );

  // ── EDUCATION ────────────────────────────────────────────────────────────
  sectionTitle('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Bachelor of Computer Applications (BCA)', margin, y);
  y += 5;
  bodyText('Focused on computer science, programming, and data management.');

  // ── TECHNICAL SKILLS ─────────────────────────────────────────────────────
  sectionTitle('Technical Skills');
  const skillGroups = [
    { label: 'Programming', items: ['Python', 'Data Analysis', 'Data Visualization'] },
    { label: 'Tools', items: ['Excel', 'Power BI', 'GitHub', 'VS Code'] },
  ];

  skillGroups.forEach((group) => {
    checkY(10);
    doc.setFont('helvetica', 'bold');
    doc.text(group.label + ':', margin, y);
    y += 5;
    bodyText(group.items.join('  ·  '), 4);
  });

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  sectionTitle('Projects');
  const projects = [
    {
      name: 'AuraBot AI Assistant',
      tech: 'Python · APIs',
      description: 'An intelligent AI assistant built using Python for automated task assistance.',
      features: ['AI-based engine', 'Fast processing']
    },
    {
        name: 'Sales Data Analysis',
        tech: 'Power BI · Excel',
        description: 'Interactive dashboard analyzing sales trends and revenue growth.',
        features: ['Trend analysis', 'Product tracking']
      }
  ];

  projects.forEach((project) => {
    checkY(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(project.name, margin, y);
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(0, 180, 216);
    const techW = doc.getTextWidth(project.tech);
    doc.text(project.tech, pageW - margin - techW, y);
    y += 5;

    bodyText(project.description, 0, 9);
    project.features.forEach((f) => bulletItem(f));
    y += 2;
  });

  // ── FOOTER ───────────────────────────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Suraj Singh Chauhan — Resume  |  Page ${i} of ${totalPages}`,
      pageW / 2,
      pageH - 8,
      { align: 'center' }
    );
  }

  doc.save('Suraj_Chauhan_Resume.pdf');
}