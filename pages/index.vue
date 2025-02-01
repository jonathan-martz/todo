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
        <div v-if="items.length > 0" class="overflow-x-auto hidden md:block">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Prio</th>
                        <th>Kategorie</th>
                        <th>Name</th>
                        <th>Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(item, index) in sortedItems" class="bg-neutral" :key="item.id">
                        <td>
                            {{ item.prio }}
                        </td>
                        <td v-if="item.expand.category">
                            {{ item.expand.category.name }}
                        </td>
                        <td v-else>-</td>
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
                            <button @click="done(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faCheck" class="w-3" />
                            </button>
                            <button @click="discarded(item.id)" class="btn btn-sm btn-primary text-white">
                                <Fa :icon="faTimes" class="w-3" />
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

        <div v-if="items.length > 0" class="overflow-x-auto block md:hidden px-3 py-3 lg:px-3 lg:py-0">
            <div class="grid grid-cols-6 gap-3">
                <div class="col-span-6" v-for="(item, index) in sortedItems" :key="item.id">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 v-if="item.expand.category">{{ item.expand.category.name }}</h3>
                            <h2 class="card-title">{{ item.name }}</h2>
                            <p>{{ item.description }}</p>
                            <div class="card-actions justify-end">
                                <button @click="edit(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faEdit" class="w-3" />
                                </button>
                                <button @click="done(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faCheck" class="w-3" />
                                </button>
                                <button @click="discarded(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faTimes" class="w-3" />
                                </button>
                                <button @click="remove(item.id)" class="btn btn-sm btn-primary text-white">
                                    <Fa :icon="faTrash" class="w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { faCheck, faEdit, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import PocketBase from 'pocketbase'
import { useRouter } from 'vue-router';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

const pb = new PocketBase('https://admin.todos.martz.cloud');

let items = ref([]);
const router = useRouter();

const sortedItems = computed(() => {
    return items.value
        .filter(item => !item.done)
        .filter(item => !item.discarded)
        .slice().sort((a, b) => b.prio - a.prio)
})

let remove = async (id) => {
    if (confirm('Willst du wirklich das Todo löschen mit der id(' + id + ')')) {
        await pb.collection('todos').delete(id);
    }
}

let discarded = async function (id) {
    await pb.collection('todos').update(id, {
        discarded: 'true'
    });
    load();
}

let done = async function (id) {
    await pb.collection('todos').update(id, {
        done: 'true'
    });
    load();
}

let edit = (id) => {
    router.push('/edit/' + id);
}

let load = async () => {
    items.value = (await pb.collection('todos').getFullList(100, { expand: 'category' }))
}

onMounted(async () => {
    load();

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
        }
    }, { /* other options like: filter, expand, custom headers, etc. */ });
});
</script>