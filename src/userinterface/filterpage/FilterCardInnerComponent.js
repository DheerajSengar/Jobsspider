import React, { useState } from "react";

export default function CardInnerComponent()
{
        const [filters, setFilters] = useState([
          "Experience",
          "Date posted",
          "Salary",
          "Education",
          "Work mode",
          "Work type",
          "Work shift",
          "Department",
          "English level",
          "Gender",
          "Sort by",
          "One-Click Filters",
        ]);
      
        const [activeFilters, setActiveFilters] = useState([]);

        const toggleFilter = (filter) => {
          setActiveFilters((prev) =>
            prev.includes(filter)
              ? prev.filter((f) => f !== filter)
              : [...prev, filter]
          );
        };
      

    return(<div style={{width:'100%',height:'100vh',background:'green',display:'flex',justifyContent:'center',alignItems:'center'}}>
         <div style={{width:'90%',height:'90vh',background:'red',display:'flex',justifyContent:'center'}}>

         
         <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => toggleFilter(filter)}
          className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${
            activeFilters.includes(filter)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
         </div>
    </div>)
}