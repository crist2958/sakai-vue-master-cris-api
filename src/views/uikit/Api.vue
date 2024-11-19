<template>
    <div>
      <div class="md:w-1/2">
        <div class="card flex flex-col gap-4">
          <div class="font-semibold text-xl mb-4">Consumir API REST</div>
  
          <div v-if="objeto">
            <h2 class="font-semibold text-xl mb-4">Detalles del Objeto</h2>
            <form @submit.prevent="updateObject">
              <div>
                <label for="name">Nombre:</label>
                <inputText type="text" id="name" v-model="objeto.name" class="w-full p-2 border border-gray-300 rounded" :disabled="true" />
              </div>
              <div v-if="objeto.data">
                <div v-for="(value, key) in objeto.data" :key="key">
                  <label :for="key">{{ key }}:</label>
                  <inputText :type="getInputType(key)" :id="key" v-model="objeto.data[key]" class="w-full p-2 border border-gray-300 rounded" :disabled="true" />
                </div>
              </div>
              <div v-else>
                <p>No hay datos adicionales.</p>
              </div>
            </form>
          </div>
  
          <InputText type="number" v-model="objectId" placeholder="Ingrese ID del objeto" class="w-full p-2 border border-gray-300 rounded" />
          <Button type="button" class="mr-2 mb-2" label="Search" icon="pi pi-search" :loading="loading[0]" @click="loadObjectData" />
  
          
  
        </div>
      </div>
  
      <div class="card mt-8">
        <div class="font-semibold text-xl mb-4">Lista Completa de Objetos</div>
        <DataTable
          :value="objetos"
          :paginator="true"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading"
          :filters="filters"
          :globalFilterFields="['name', 'data.color', 'data.capacity', 'data.price']"
          showGridlines
        >
          <template #header>
            <div class="flex justify-between">
              <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter" />
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
            </div>
          </template>
          <template #empty> No objects found. </template>
          <template #loading> Loading objects data. Please wait. </template>
  
          <Column field="name" header="Name" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
            </template>
          </Column>
  
          <Column header="Details" style="min-width: 12rem">
            <template #body="{ data }">
              <div v-if="data.data">
                <div v-for="(value, key) in data.data" :key="key">
                  <strong>{{ key }}:</strong> {{ value }}
                </div>
              </div>
              <div v-else>
                N/A
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchObjectById } from '@/service/ConsumApi';
import axios from 'axios';
  
  export default {
    data() {
      return {
        objeto: null,
        objectId: 5, // ID inicial, puedes cambiarlo según necesites
        objetos: [], // Lista para almacenar todos los objetos
        filters: {
          'global': { value: null, matchMode: 'contains' },
          'name': { value: null, matchMode: 'contains' },
          'data.color': { value: null, matchMode: 'contains' },
          'data.capacity': { value: null, matchMode: 'contains' },
          'data.price': { value: null, matchMode: 'contains' },
        },
        loading: true,
      };
    },
    created() {
      this.loadAllObjects();
    },
    methods: {
      async loadObjectData() {
        try {
          this.objeto = await fetchObjectById(this.objectId);
        } catch (error) {
          console.error("Error al cargar los datos del objeto:", error);
        }
      },
      async loadAllObjects() {
        try {
          const response = await axios.get('https://api.restful-api.dev/objects');
          this.objetos = response.data;
          this.loading = false;
        } catch (error) {
          console.error("Error al cargar todos los datos:", error);
          this.loading = false;
        }
      },
      clearFilter() {
        this.filters = {
          'global': { value: null, matchMode: 'contains' },
          'name': { value: null, matchMode: 'contains' },
          'data.color': { value: null, matchMode: 'contains' },
          'data.capacity': { value: null, matchMode: 'contains' },
          'data.price': { value: null, matchMode: 'contains' },
        };
      },
      getInputType(key) {
        return typeof this.objeto.data[key] === 'number' ? 'number' : 'text';
      },
      updateObject() {
        console.log("Objeto actualizado:", this.objeto);
      }
    }
  };
  </script>
  
  <style scoped>
  input, label {
    display: block;
    margin: 5px 0;
  }
  button {
    margin-top: 10px;
  }
  .p-input-icon-left-custom {
    display: flex;
    align-items: center;
  }
  .p-input-icon-left-custom i {
    margin-right: 8px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  .mt-8 {
    margin-top: 2rem; /* Añadir margen superior */
  }
  </style>
  