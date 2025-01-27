import { defineStore } from 'pinia';
import { supabase } from '../supabase/client'
import bcrypt from 'bcryptjs';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: string; email: string, name:string } | null,
  }),

  actions: {
    async register(fullName: string, email: string, password: string) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const { data, error } = await supabase.from('users').insert([
        {
          name,
          email,
          encrypted_password: hashedPassword,
        },
      ]);

      if (error) throw new Error(error.message);
      return data;
    },

    async login(email: string, password: string) {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, encrypted_password')
        .eq('email', email);

      if (error) throw new Error('Invalid email or password');

      const isValid = bcrypt.compareSync(password, data.encrypted_password);
      if (!isValid) throw new Error('Invalid email or password');

      this.user = { id: data.id, email: data.email, name: data.name };
      return this.user;
    },

    logout() {
      this.user = null;
    },
  },
});
