import { defineStore } from 'pinia';
import { supabase } from '../supabase/client'

export const useInvestmentCategoriesStore = defineStore('investmentCategories', {
  state: () => ({
    categories: [],
    groupedCategories: [],
  }),

  actions: {
    async getAllCategories() {
      try {
        const { data, error } = await supabase
          .from('investment_categories')
          .select('*');

        if (error) throw error;

        this.categories = data;

        // Group data by type
        const grouped = data.reduce((acc, item) => {
          const type = item.type;
          if (!acc[type]) {
            acc[type] = {
              type: type,
              items: [],
            };
          }
          acc[type].items.push({ name: item.name });
          return acc;
        }, {});

        this.groupedCategories = Object.values(grouped);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
});
