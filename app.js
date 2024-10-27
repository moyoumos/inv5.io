document.addEventListener('DOMContentLoaded', () => {
    // Check if supabase.createClient is available
    if (typeof window.supabase === 'undefined' && typeof supabase !== 'undefined') {
        const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';

        // Initialize Supabase client as a global variable
        window.supabase = supabase.createClient(supabaseUrl, supabaseKey);

        console.log('Supabase client initialized:', window.supabase);
    } else {
        console.error('Supabase library did not load correctly...');
        return;
    }

    // Fetch items to test the connection
    async function fetchItems() {
        try {
            const { data, error } = await window.supabase
                .from('items')
                .select('*');

            if (error) {
                console.error('Error fetching items:', error);
                alert('Error fetching items: ' + error.message);
                return;
            }

            if (data && data.length > 0) {
                console.log('Items:', data);
                populateTable(data); // Call your table population function here
            } else {
                console.log('No items found.');
                alert('No items found in the database.');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Unexpected error: ' + err.message);
        }
    }

    // Call fetchItems after defining it
    fetchItems();
});
