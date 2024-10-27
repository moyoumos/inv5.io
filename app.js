// Initialize Supabase client
const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Define Alpine.js component
function itemTable() {
    return {
        items: [],         // Array to hold items from the database
        loading: true,     // Loading state
        error: '',         // Error message

        async fetchItems() {
            this.loading = true;
            this.error = '';

            const { data, error } = await supabase
                .from('items')
                .select('*');

            if (error) {
                this.error = 'Error fetching items: ' + error.message;
            } else {
                this.items = data;
            }
            this.loading = false;
        },

        // Alpine.js init hook to fetch data when the component loads
        init() {
            this.fetchItems();
        }
    }
}
