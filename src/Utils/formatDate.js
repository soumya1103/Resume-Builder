export const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const [month, year] = dateString.split("/");
  
    const monthNames = [
      "January", "February", "March", "April", "May", 
      "June", "July", "August", "September", "October", 
      "November", "December"
    ];
  
    const monthIndex = parseInt(month, 10) - 1; 
    return monthNames[monthIndex] ? `${monthNames[monthIndex]} ${year}` : dateString;
  };