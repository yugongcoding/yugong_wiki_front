<template>
      <tiny-dialog-box
      ref="dialogSelect"
      title="创建知识库"
      :is-form-reset="true"
      class="dialog"
      :visible="book.showDialog"
      @update:visible="book.showDialog = $event"
    >
      <tiny-form ref="ruleFormRef" :model="book.createData" label-width="100px" :rules="rules">
        <tiny-form-item label="知识库名称" prop="name" :validate-icon="validateIcon">
          <tiny-input v-model.trim="book.createData.name" placeholder="知识库名称"></tiny-input>
        </tiny-form-item>
        <tiny-form-item label="知识库标识" prop="category" :validate-icon="validateIcon">
          <tiny-input v-model.trim="book.createData.category" placeholder="知识库标识"></tiny-input>
        </tiny-form-item>
        <tiny-form-item label="所属团队" prop="team" :validate-icon="validateIcon">
          <tiny-select v-model.trim="book.createData.team" placeholder="团队空间" @change="teamChange" :disabled="book.authDisabled">
            <tiny-option v-for="item in book.teamOptions" :key="item.value" :label="item.label" :value="item.value">
            </tiny-option>
          </tiny-select>
        </tiny-form-item>
        <tiny-form-item label="可见范围" prop="auth" extra="知识库可见范围设置后暂不支持修改">
          <tiny-select v-model="book.createData.auth" placeholder="可见范围" :disabled="book.authDisabled">
            <tiny-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
            </tiny-option>
          </tiny-select>
        </tiny-form-item>
        <tiny-form-item label="知识库描述" prop="description" :validate-icon="validateIcon">
          <tiny-input v-model.trim="book.createData.description"  type="textarea"  placeholder="知识库描述"></tiny-input>
        </tiny-form-item>
      </tiny-form>

      <template #footer>
        <tiny-button type="primary" :loading="book.btnSubmit.loading" @click="handleSubmit">{{
          book.btnSubmit.text[book.btnSubmit.loading]
        }}</tiny-button>
        <tiny-button  @click="book.showDialog=false">取消</tiny-button>
      </template>
    </tiny-dialog-box>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Select as TinySelect,
  Option as TinyOption,
  DialogBox as TinyDialogBox,
  Button as TinyButton,
  TimeLine as TinyTimeLine,
  Form as TinyForm,
  FormItem as TinyFormItem,
  Input as TinyInput,
  DatePicker as TinyDatePicker,
  Modal,
  RadioGroup as TinyRadioGroup,
  Numeric as TinyNumeric,
  IpAddress as TinyIpAddress,
  ButtonGroup as TinyButtonGroup } from '@opentiny/vue';
import { iconWarning } from '@opentiny/vue-icon'
import { bookStore } from '@/store';
import { getAuthOptions } from '@/api/space'

const book = bookStore()
const validateIcon = ref(iconWarning())

const authOptions = ref([{
        label: '公开可见',
        value: 0
      },{
        label: '私人可见',
        value: 1
      },{
        label: '空间成员可见',
        value: 2
      }
  ])

const teamChange = async () => {
  let params = {id: book.createData.team, resourceType: 'team'}
  let res = await getAuthOptions(params)
  authOptions.value = res.data
}
// 表单校验规则
const rules = ref({
  description: [{ required: true, message: '必填', trigger: 'change'},
                { required: true, message: '长度介于1~255', trigger: 'change',  min: 1, max: 255 }],
  name: [{ required: true, message: '必填', trigger: 'change'},
         { required: true, message: '长度介于1~50', trigger: 'change',  min: 1, max: 50 }],
  category: [{ required: false, message: '长度介于0~10', trigger: 'change',  min: 0, max: 10 }],
  auth: [{ required: true, message: '必填', trigger: 'change' }],
  team: [{ required: true, message: '必填', trigger: 'change' }],
  id: [{ required: true }]
})



const ruleFormRef = ref()

const handleSubmit = () => {
book.btnSubmit.loading = true
ruleFormRef.value
.validate()
.then(async () => {
    await book.createBookSpaceData()
    await book.getBookSpaceData()
})
.catch(() => {
   Modal.message({
    status: 'error',
    message: '表单数据校验失败，请检查您的输入是否正确',
  })
}).finally(() => {
  book.btnSubmit.loading = false
})

}
</script>

<style scoped lang="less">
.createTeamSpace {
  width: 98%;
  margin: 0 auto;
}
</style>

