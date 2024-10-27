// Confirm Supabase library has loaded before initialization
if (window.supabase) {
    console.log('Initializing Supabase client');

    // Initialize the client
    const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
    const supabaseKey = 'your-supabase-key';
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
                // Populate your table or UI here based on 'data'
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
