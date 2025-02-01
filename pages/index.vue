<template>
    <section class="page bg-blue-200 md:mx-auto max-w-6xl">
        <section class="flex justify-between items-center px-3 py-3">
            <div class="headline">
                <h2 class="font-bold">Todos</h2>
            </div>
            <section class="actions">
                <a href="/add" class="btn btn-primary btn-sm">
                    <Fa :icon="faPlus" size="2x" class="w-3" />
                </a>
            </section>
        </section>
        <div v-if="items.length > 0" class="overflow-x-auto">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(item, index) in sortedItems" :key="item.id">
                        <th>{{ index }}</th>
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ item.description }}
                        </td>
                        <td class="flex justify-end space-x-3">
                            <button @click="edit(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faEdit" class="w-3" />
                            </button>
                            <button @click="remove(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faTrash" class="w-3" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="text-sm block text-center px-3 py-3 font-bold">Es gibt für dich noch keine Todos.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

const pb = new PocketBase('https://admin.todos.martz.cloud');

let items = ref([]);
const router = useRouter();

const sortedItems = computed(() => {
    
  return items.value.slice().sort((a, b) => a.created - b.created)
})

let remove = async (id) => {
    if (confirm('Willst du wirklich das Todo löschen mit der id(' + id + ')')) {
        await pb.collection('todos').delete(id);
    }
}

let edit = (id) => {
    router.push('/edit/' + id);
}

onMounted(async () => {
    items.value = (await pb.collection('todos').getFullList(100))

    pb.collection('todos').subscribe('*', function (e) {
        if (e.action == 'delete') {
            items.value = items.value.filter(item => item.id !== e.record.id);
        }
        else if (e.action == 'create') {
            items.value.push(e.record);
        }
        else if (e.action == 'update') {
            items.value.map((item, index) => {
                if (item.id == e.record.id) {
                    items.value[index] = e.record
                }
            });
            console.log('Updated item:', updatedItem);
        }
    }, { /* other options like: filter, expand, custom headers, etc. */ });
});
</script>