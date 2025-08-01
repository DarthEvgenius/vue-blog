<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Создать блог"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Новый блог"
      >
        <v-card-text>
          <v-form
            ref="formRef"
            v-model="isValidForm"
          >
            <v-row dense>
              <v-col
                cols="6"
  
              >
                <v-text-field
                  v-model="fullName"
                  :rules="rules"
                  label="имя автора*"
                  required
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="blogName"
                  :rules="rules"
                  label="имя блога*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <small class="text-caption text-medium-emphasis">*Обязательные поля</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="closeDialog"
          ></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="saveUser"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import api from '@/api/http'
  import { usePostsStore } from '@/stores/postsStore'

  const postsStore = usePostsStore()

  const dialog = ref(false)
  const formRef = ref()
  const isValidForm = ref<boolean | null>(false)

  const blogName = ref()
  const fullName = ref()

  const rules = [
    (value: string) => {
      if (value) return true
      return 'Заполните поле'
    }
  ]

  async function saveUser() {
    if (!formRef.value) return
    const { valid } = await formRef.value.validate()

    if (valid) {
      await createBlog()
      await postsStore.fetchAllUserInfo()
      
      formRef.value.reset()
      closeDialog()
    }
  }

  async function createBlog() {
    try {
      const response = await api.post('/userInfo', {
        blogName: blogName.value,
        fullName: fullName.value
      })

      console.log('Created:', response.data)

      return response.data
    } catch(e) {
      console.warn('Error while create user', e)
    }
  }
  
  function closeDialog() {
    dialog.value = false
  }
</script>