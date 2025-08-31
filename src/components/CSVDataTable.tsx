import { useState, useEffect } from 'react';

interface CSVDataTableProps {
  csvUrl: string;
}

export default function CSVDataTable({ csvUrl }: CSVDataTableProps) {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);

  // Mock data fallback
  const fallbackData = [
    ['Timestamp', 'Name', 'Email', 'Major', 'Year', 'Goals', 'Hobbies'],
    [new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(), 'Sarah Chen', 'sc1234@rit.edu', 'Computer Science', 'Fourth Year', 'Help international students adapt to campus life and connect with cultural communities', 'Traditional dance, Cooking, Photography'],
    [new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString(), 'Michael Patel', 'mp5678@rit.edu', 'Business Administration', 'Third Year', 'Share career networking tips and support first-gen college students', 'Cricket, Music production, Travel'],
    [new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(), 'Jessica Kim', 'jk9012@rit.edu', 'Engineering', 'Graduate Student', 'Guide undergrads in research opportunities and cultural identity exploration', 'Martial arts, Gaming, Language exchange']
  ];

  const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let current = '';
    let inQuotes = false;
    let currentRow: string[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        currentRow.push(current.trim());
        current = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        // End of row
        if (char === '\r' && nextChar === '\n') {
          i++; // Skip \n in \r\n
        }
        currentRow.push(current.trim());
        if (currentRow.some(cell => cell.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        current = '';
      } else {
        current += char;
      }
    }

    // Handle last row if it doesn't end with newline
    if (current || currentRow.length > 0) {
      currentRow.push(current.trim());
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow);
      }
    }

    return rows;
  };

  const fetchCSVData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timestamp to prevent caching
      const urlWithTimestamp = `${csvUrl}&t=${Date.now()}`;
      
      // Try multiple approaches to handle CORS issues
      const fetchAttempts = [
        // First attempt: Direct fetch with proper headers
        () => fetch(urlWithTimestamp, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-store',
          headers: {
            'Accept': 'text/csv, text/plain, */*',
            'Cache-Control': 'no-cache'
          }
        }),
        // Second attempt: Try without timestamp
        () => fetch(csvUrl, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-store'
        }),
        // Third attempt: Using allorigins.win CORS proxy
        () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(csvUrl)}`, {
          cache: 'no-store'
        }),
        // Fourth attempt: Using corsproxy.io
        () => fetch(`https://corsproxy.io/?${encodeURIComponent(csvUrl)}`, {
          cache: 'no-store'
        })
      ];

      let lastError: Error | null = null;
      let is404Error = false;
      
      for (let i = 0; i < fetchAttempts.length; i++) {
        try {
          console.log(`Attempting CSV fetch method ${i + 1}...`);
          const response = await fetchAttempts[i]();

          if (!response.ok) {
            if (response.status === 404) {
              is404Error = true;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          let text: string;
          
          // Handle different response formats
          if (i === 2) { // allorigins.win returns JSON
            const jsonData = await response.json();
            text = jsonData.contents;
          } else {
            text = await response.text();
          }

          // Validate that we got CSV-like data
          if (!text || text.trim().length === 0) {
            throw new Error('Empty response received');
          }

          // Check if it looks like an error page instead of CSV
          if (text.includes('<html') || text.includes('<!DOCTYPE')) {
            throw new Error('Received HTML instead of CSV data');
          }

          const parsedData = parseCSV(text);
          
          if (parsedData.length === 0) {
            throw new Error('No data found in CSV');
          }
          
          console.log(`CSV fetch successful using method ${i + 1}`);
          setData(parsedData);
          return; // Success, exit the loop
          
        } catch (err) {
          lastError = err instanceof Error ? err : new Error('Unknown error');
          console.warn(`CSV fetch method ${i + 1} failed:`, lastError.message);
          
          // If we get 404 on the first two attempts, skip to fallback immediately
          if (lastError.message.includes('404') && i < 2) {
            is404Error = true;
          }
          
          // Continue to next method unless it's the last one
          if (i === fetchAttempts.length - 1) {
            throw lastError;
          }
        }
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Could not load responses';
      
      // For 404 errors, immediately show fallback data
      if (errorMessage.includes('404')) {
        console.log('Spreadsheet not found (404) - showing sample data immediately');
        setShowFallback(true);
        setError('Google Sheets data not accessible. Showing sample data below.');
      } else {
        setError(`Unable to load live data. This may be due to Google Sheets permissions or network restrictions.`);
        // Automatically show fallback data after a brief delay for other errors
        setTimeout(() => {
          setShowFallback(true);
        }, 2000);
      }
      
      console.error('All CSV fetch attempts failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCSVData();
  }, [csvUrl]);

  // Auto-retry once after 5 seconds if failed (but not for 404 errors)
  useEffect(() => {
    if (error && retryCount === 0 && !error.includes('404') && !showFallback) {
      const retryTimer = setTimeout(() => {
        console.log('Auto-retrying CSV fetch once more...');
        setRetryCount(1);
        fetchCSVData();
      }, 5000);

      return () => clearTimeout(retryTimer);
    }
  }, [error, retryCount, showFallback]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3 text-gray-600">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading responses…</span>
        </div>
      </div>
    );
  }

  if (error && !showFallback) {
    return (
      <div className="text-center py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-amber-600 mb-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Live data unavailable</span>
          </div>
          <p className="text-amber-700 text-sm mb-4">
            Unable to load live responses from Google Sheets. This may be due to permission settings or network restrictions.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setRetryCount(0);
                setShowFallback(false);
                setError(null);
                fetchCSVData();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <button
              onClick={() => setShowFallback(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8bd4e0] hover:bg-[#7bc7d3] text-gray-800 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Show Example Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use fallback data if real data failed to load and user requested it
  const displayData = showFallback && data.length === 0 ? fallbackData : data;
  
  if (displayData.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No submissions yet.</p>
        </div>
      </div>
    );
  }

  const headers = displayData[0] || [];
  const rows = displayData.slice(1);

  return (
    <div className="overflow-x-auto">
      {showFallback && (
        <div className="mb-4 p-4 bg-[#8bd4e0]/10 border border-[#8bd4e0]/30 rounded-xl">
          <div className="flex items-start gap-3 text-gray-700">
            <svg className="w-5 h-5 mt-0.5 text-[#8bd4e0]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 mb-1">Sample Data Display</div>
              <div className="text-sm text-gray-600">
                Live mentor signup data is not currently accessible. The table below shows example entries to demonstrate the format.
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-w-full">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left font-medium text-gray-900 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-gray-100 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50 transition-colors ${showFallback ? 'opacity-75' : ''}`}
              >
                {headers.map((_, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm"
                  >
                    {row[cellIndex] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}