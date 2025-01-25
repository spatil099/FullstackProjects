import { defineStore } from 'pinia';
import { supabase } from '../supabase/client'
import bcrypt from 'bcryptjs';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: string; email: string } | null,
  }),

  actions: {
    async register(fullName: string, email: string, password: string) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const { data, error } = await supabase.from('users').insert([
        {
          full_name: fullName,
          email,
          password_hash: hashedPassword,
        },
      ]);

      if (error) throw new Error(error.message);
      return data;
    },

    async login(email: string, password: string) {
      const { data, error } = await supabase
        .from('users')
        .select('user_id, email, password_hash')
        .eq('email', email)
        .single();

      if (error) throw new Error('Invalid email or password');

      const isValid = bcrypt.compareSync(password, data.password_hash);
      if (!isValid) throw new Error('Invalid email or password');

      this.user = { id: data.id, email: data.email };
      return this.user;
    },

    logout() {
      this.user = null;
    },
  },
});
