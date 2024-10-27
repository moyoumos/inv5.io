// Supabase and Alpine.js Setup
document.addEventListener('alpine:init', () => {
    Alpine.data('tableApp', () => ({
        isMenuOpen: false,
        items: [],

        async init() {
            // Initialize Supabase client
            const supabaseUrl = 'https://gakwgsmogfbwhfuyjckn.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha3dnc21vZ2Zid2hmdXlqY2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMzQ2MjUsImV4cCI6MjA0NTYxMDYyNX0.z62vWuiYLoDKGrmr3oCx7w0P465p07DzSpApYdt8p4Q';
            const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

            // Fetch items from the database
            const { data, error } = await supabase.from('items').select('*');
            if (error) {
                console.error('Error fetching items:', error);
            } else {
                this.items = data;
            }
        },

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }));
});
