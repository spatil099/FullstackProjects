<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase/client'
import { useAuthStore } from '../stores/auth'; 
import { useRouter } from 'vue-router';
import NavBar from '../views/NavBar.vue';

// Pinia store instance
const authStore = useAuthStore();

// User information from the store
const user = JSON.parse(localStorage.getItem('auth'));
const router = useRouter();

if (!user) {
  console.error('No user found. Redirecting to login.');
  router.push('/login');
}

// Data states for tables
const stocks = ref<any[]>([]);
const fixedDeposits = ref<any[]>([]);
const insurancePolicies = ref<any[]>([]);
const mutualFunds = ref<any[]>([]);
const loans = ref<any[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Fetch data for the logged-in user
const fetchData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const userId = user.id;
    // Fetch data for all tables
    const { data: stocksData, error: stocksError } = await supabase
      .from('investments')
      .select('*, stocks(*)')
      .eq('user_id', userId)
      .eq('category_id',9);

    const { data: fdsData, error: fdsError } = await supabase
      .from('investments')
      .select('*, fixed_deposits(*)')
      .eq('user_id', userId)
      .eq('category_id',6);

    const { data: insuranceData, error: insuranceError } = await supabase
      .from('investments')
      .select('*, insurance_policies(*)')
      .eq('user_id', userId)
      .eq('category_id',7);

    const { data: mutualFundsData, error: mutualFundsError } = await supabase
      .from('investments')
      .select('*, mutual_funds(*)')
      .eq('user_id', userId)
      .eq('category_id',10);

    const { data: loansData, error: loansError } = await supabase
      .from('investments')
      .select('*, loans(*)')
      .eq('user_id', userId)
      .eq('category_id',8);

    // Handle errors
    if (stocksError || fdsError || insuranceError || mutualFundsError || loansError) {
      error.value = 'Failed to fetch some data. Please try again.';
    }

    // Assign data
    stocks.value = stocksData || [];
    fixedDeposits.value = fdsData || [];
    insurancePolicies.value = insuranceData || [];
    mutualFunds.value = mutualFundsData || [];
    loans.value = loansData || [];
  } catch (err) {
    error.value = 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch data on component mount
onMounted(fetchData);
</script>

<template>
  <NavBar></NavBar>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <div v-if="isLoading" class="text-center">Loading data...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else>
        <!--Fixed Deposits tables-->
        <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Fixed Deposits</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Invested</th>
              <th class="border border-gray-300 p-2">Purchased On</th>
              <th class="border border-gray-300 p-2">Tenure</th>
              <th class="border border-gray-300 p-2">Interest Rate</th>
              <th class="border border-gray-300 p-2">Maturity Date</th>
              <th class="border border-gray-300 p-2">Created On</th>
              <th class="border border-gray-300 p-2">Updated On</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fd in fixedDeposits" :key="fd.name">
              <td class="border border-gray-300 p-2">{{ fd.name }}</td>
              <td class="border border-gray-300 p-2">{{ fd.principal_amount }}</td>
              <td class="border border-gray-300 p-2">{{ fd.purchase_date }}</td>
              <td class="border border-gray-300 p-2">{{ fd.fixed_deposits.tenure }}</td>
              <td class="border border-gray-300 p-2">{{ fd.fixed_deposits.interest_rate }}</td>
              <td class="border border-gray-300 p-2">{{ fd.fixed_deposits.maturity_date }}</td>
              <td class="border border-gray-300 p-2">{{ fd.created_at }}</td>
              <td class="border border-gray-300 p-2">{{ fd.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!--Insurance policies tables-->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Insurance Policies</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Invested</th>
              <th class="border border-gray-300 p-2">Purchased On</th>
              <th class="border border-gray-300 p-2">Premium Payment Tenure</th>
              <th class="border border-gray-300 p-2">Survival Benifit</th>
              <th class="border border-gray-300 p-2">Maturity Beenifit</th>
              <th class="border border-gray-300 p-2">Created On</th>
              <th class="border border-gray-300 p-2">Updated On</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ip in insurancePolicies" :key="ip.name">
              <td class="border border-gray-300 p-2">{{ ip.name }}</td>
              <td class="border border-gray-300 p-2">{{ ip.principal_amount }}</td>
              <td class="border border-gray-300 p-2">{{ ip.purchase_date }}</td>
              <td class="border border-gray-300 p-2">{{ ip.insurance_policies.premium_payment_term }}</td>
              <td class="border border-gray-300 p-2">{{ ip.insurance_policies.survival_benefit }}</td>
              <td class="border border-gray-300 p-2">{{ ip.insurance_policies.maturity_benefit }}</td>
              <td class="border border-gray-300 p-2">{{ ip.created_at }}</td>
              <td class="border border-gray-300 p-2">{{ ip.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!--Loans tables-->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Loans</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Invested</th>
              <th class="border border-gray-300 p-2">Purchased On</th>
              <th class="border border-gray-300 p-2">Debtor Name</th>
              <th class="border border-gray-300 p-2">Interest Rate</th>
              <th class="border border-gray-300 p-2">Start Date</th>
              <th class="border border-gray-300 p-2">End Date</th>
              <th class="border border-gray-300 p-2">Outstanding Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loan in loans" :key="loan.name">
              <td class="border border-gray-300 p-2">{{ loan.name }}</td>
              <td class="border border-gray-300 p-2">{{ loan.principal_amount }}</td>
              <td class="border border-gray-300 p-2">{{ loan.purchase_date }}</td>
              <td class="border border-gray-300 p-2">{{ loan.loans.debtor_name }}</td>
              <td class="border border-gray-300 p-2">{{ loan.loans.interest_rate }}</td>
              <td class="border border-gray-300 p-2">{{ loan.loans.loan_start_date }}</td>
              <td class="border border-gray-300 p-2">{{ loan.loans.loan_end_date }}</td>
              <td class="border border-gray-300 p-2">{{ loan.loans.outstanding_balance }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- Stocks Table -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Stocks</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Invested</th>
              <th class="border border-gray-300 p-2">Purchased On</th>
              <th class="border border-gray-300 p-2">Quantity</th>
              <th class="border border-gray-300 p-2">Purchase Price</th>
              <th class="border border-gray-300 p-2">Current Price</th>
              <th class="border border-gray-300 p-2">Dividend Recieved till date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in stocks" :key="stock.id">
              <td class="border border-gray-300 p-2">{{ stock.name }}</td>
              <td class="border border-gray-300 p-2">{{ stock.principal_amount }}</td>
              <td class="border border-gray-300 p-2">{{ stock.purchase_date }}</td>
              <td class="border border-gray-300 p-2">{{ stock.stocks.quantity }}</td>
              <td class="border border-gray-300 p-2">{{ stock.stocks.purchase_price }}</td>
              <td class="border border-gray-300 p-2">{{ stock.stocks.current_value }}</td>
              <td class="border border-gray-300 p-2">{{ stock.stocks.dividend_received }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    <!-- Mutual Funds Table -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Mutual Funds</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Invested</th>
              <th class="border border-gray-300 p-2">Purchased On</th>
              <th class="border border-gray-300 p-2">Fund House</th>
              <th class="border border-gray-300 p-2">Purchased at NAV</th>
              <th class="border border-gray-300 p-2">Current NAV</th>
              <th class="border border-gray-300 p-2">Units</th>
              <th class="border border-gray-300 p-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mFunds in mutualFunds" :key="mFunds.name">
              <td class="border border-gray-300 p-2">{{ mFunds.name }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.principal_amount }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.purchase_date }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.mutual_funds.fund_house }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.mutual_funds.purchase_price }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.mutual_funds.current_value }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.mutual_funds.units }}</td>
              <td class="border border-gray-300 p-2">{{ mFunds.mutual_funds.performance }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
table {
  text-align: left;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
}

th,
td {
  padding: 0.5rem;
}
</style>
