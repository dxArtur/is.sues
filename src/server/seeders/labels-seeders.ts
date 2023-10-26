import Label from "../models/label-interface";

const labels: Label[] = [
    { id: 1, name: "bug", color: "purple", description: "Report an error or issue." },
    { id: 2, name: "feature", color: "blue", description: "Suggest a new feature." },
    { id: 3, name: "documentation", color: "pink", description: "Documentation or instructions." },
    { id: 4, name: "enhancement", color: "cyan", description: "Improvements to existing features." },
    { id: 5, name: "questions", color: "orange", description: "Questions or inquiries." },
  ];
  
  function getAllLabels(){
    return labels
  }

  export default { getAllLabels}


