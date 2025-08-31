import { useState, useEffect } from "react";

interface TableRow {
  [key: string]: string;
}

interface LiveResponsesTableProps {
  title?: string;
  className?: string;
}

// CSV parsing function that handles commas inside quotes
function parseCSV(csvText: string): TableRow[] {
  const lines = [];
  let currentLine = '';
  let insideQuote = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    
    if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === '\n' && !insideQuote) {
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      continue;
    }
    
    currentLine += char;
  }
  
  // Add the last line if it exists
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  
  if (lines.length === 0) return [];
  
  // Parse each line into fields
  const parsedLines = lines.map(line => {
    const fields = [];
    let currentField = '';
    let insideQuote = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        fields.push(currentField.trim().replace(/^"(.*)"$/, '$1'));
        currentField = '';
        continue;
      }
      
      currentField += char;
    }
    
    // Add the last field
    fields.push(currentField.trim().replace(/^"(.*)"$/, '$1'));
    return fields;
  });
  
  if (parsedLines.length < 2) return [];
  
  const headers = parsedLines[0];
  const dataRows = parsedLines.slice(1);
  
  return dataRows.map(row => {
    const rowObject: TableRow = {};
    headers.forEach((header, index) => {
      rowObject[header] = row[index] || '';
    });
    return rowObject;
  });
}

export default function LiveResponsesTable({ 
  title = "Mentor Responses", 
  className = "" 
}: LiveResponsesTableProps) {
  const [data, setData] = useState<TableRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Add timestamp to disable caching
      const timestamp = new Date().getTime();
      const csvUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTyKOr9KhbtW4-DgxSF16PH4h4oDN6xjlVGkwf17m1nrkg9KhVlNUjt-sdYTuRtw2bdc4Lw8EN_-iEJ/pub?gid=1562411253&single=true&output=csv&t=${timestamp}`;
      
      const response = await fetch(csvUrl, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      
      if (!csvText.trim()) {
        throw new Error('No data available');
      }
      
      const parsedData = parseCSV(csvText);
      
      if (parsedData.length === 0) {
        setHeaders([]);
        setData([]);
      } else {
        // Extract headers dynamically from the first row of parsed data
        const dynamicHeaders = Object.keys(parsedData[0]);
        setHeaders(dynamicHeaders);
        setData(parsedData);
      }
    } catch (err) {
      console.error('Error fetching CSV data:', err);
      setError(err instanceof Error ? err.message : 'Could not load responses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading responses…</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-red-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Could not load responses</span>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-[#8bd4e0] hover:bg-[#7bc7d3] text-black font-medium rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="text-center py-12 text-gray-500">
          <p>No responses yet. Be the first to sign up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Live data</span>
          <button
            onClick={fetchData}
            className="ml-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="text-left py-3 px-4 font-medium text-gray-800 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  {headers.map((header, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="py-3 px-4 text-gray-700 whitespace-nowrap"
                    >
                      <div className="max-w-xs truncate" title={row[header]}>
                        {row[header] || '-'}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {data.length} response{data.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}