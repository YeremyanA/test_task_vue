<template>
  <div class="home">
    <div>
      <a href="#" @click="logout">Logout</a>
      <h1>Products</h1>
      <div class="search_block">
        <input
            type="text"
            placeholder="ex. name | author name | 2020-10-15"
            v-model="search_query"
            @input="searchInTable(search_query)"
        />
      </div>

      <table id="products">
        <tr>
          <th v-for="(header, index) in table_headers" :key="index">
            {{ header.label }}
          </th>
        </tr>

        <tr v-for="(product, index) in products" :key="index">
          <td v-for="(header, idx) in table_headers" :key="idx">
            {{ product[header.key] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      products: [],
      table_headers: [
        { label: "Name", key: "productName" },
        { label: "Author Name", key: "authorName" },
        { label: "Created At", key: "createdDate" },
      ],
      search_query: null,
    };
  },
  mounted() {
    this.$axios
        .get('/products')
        .then(result => {this.products = result.data})
        .catch(error => console.log(error))
  },
  methods: {
    async searchInTable(searchText) {
      const params = {};
      if (searchText) params.search = searchText;
      const { data } = await this.$axios.get("/products", { params });
      this.products = data;
    },
    logout(e) {
      e.preventDefault();
      localStorage.removeItem("token");
      this.$router.push({name : 'Login'});
    }
  },
};
</script>

<style scoped>
input[type="text"],
select {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
#products {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin: auto;
}

#products td,
#products th {
  border: 1px solid #ddd;
  padding: 8px;
}

#products tr:nth-child(even) {
  background-color: #f2f2f2;
}

#products tr:hover {
  background-color: #ddd;
}

#products tr td {
  text-align: left;
}

#products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
