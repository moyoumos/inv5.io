// Confirm Supabase library has loaded before initialization
if (window.supabase) {
    console.log('Initializing Supabase client');

    // Initialize the client
    const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // Log to confirm client creation
    console.log('Supabase client initialized:', supabase);

    // Function to fetch items to verify connectivity
    async function fetchItems() {
        try {
            const { data, error } = await supabase.from('items').select('*');
            if (error) {
                console.error('Error fetching items:', error);
            } else {
                console.log('Fetched items:', data);
                populateTable(data);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    }

    // Run the test function to check connection to the database
    fetchItems();
} else {
    console.error('Supabase did not load correctly');
}

function populateTable(items) {
    const tableBody = document.querySelector('#itemsTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.qntty}</td>
            <td>${item.price}</td>
            <td>${item.rmrqs}</td>
        `;
        tableBody.appendChild(row);
    });
}
