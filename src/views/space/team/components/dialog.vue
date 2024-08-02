<template>
  <tiny-dialog-box
    resize
    ref="dialogSelect"
    title="创建团队空间"
    :is-form-reset="true"
    class="dialog"
    :visible="team.showDialog"
    @update:visible="team.showDialog = $event"
  >
    <div class="form">
    <tiny-form ref="ruleFormRef" :model="team.createData" label-width="100px" :rules="rules">
      <tiny-form-item label="空间名称" prop="name" :validate-icon="validateIcon" :validate-debounce="true">
        <tiny-input v-model.trim="team.createData.name" placeholder="空间名称"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="空间标识" prop="category" :validate-icon="validateIcon">
        <tiny-input v-model.trim="team.createData.category" placeholder="空间标识"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="可见范围" prop="auth" extra="团队空间可见范围设置后暂不支持修改"  >
        <tiny-select v-model="team.createData.auth" placeholder="可见范围" :disabled="team.authDisabled">
          <tiny-option v-for="item in authOptions" :key="item.value" :label="item.label" :value="item.value">
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
      <tiny-form-item label="空间描述" prop="description" :validate-icon="validateIcon" :validate-debounce="true">
        <tiny-input v-model.trim="team.createData.description"  type="textarea" placeholder="空间描述"></tiny-input>
      </tiny-form-item>
    </tiny-form>
    </div>

    <template #footer>
      <tiny-button type="primary" :loading="team.btnSubmit.loading" @click="handleSubmit">{{
        team.btnSubmit.text[team.btnSubmit.loading]
      }}</tiny-button>
      <tiny-button  @click="team.showDialog=false">取消</tiny-button>
    </template>
  </tiny-dialog-box>

  <tiny-dialog-box
    ref="invite"
    title="邀请协作"
    :is-form-reset="true"
    class="dialog"
    :visible="team.showInviteDialog"
    @update:visible="team.showInviteDialog = $event"
  >
    <div class="form">
    <tiny-form ref="ruleFormRef" :model="team.inviteData" label-width="100px" :rules="inviteRules">
      <tiny-form-item label="邮箱" prop="email" :validate-icon="validateIcon" :validate-debounce="true">
        <tiny-input v-model.trim="team.inviteData.email" placeholder="邮箱"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="角色" prop="role" >
        <tiny-select v-model="team.inviteData.role" placeholder="角色">
          <tiny-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
    </tiny-form>
    </div>

    <template #footer>
      <tiny-button type="primary" :loading="team.btnSubmit.loading" @click="inviteUserEnter()">{{
        team.btnSubmit.text[team.btnSubmit.loading]
      }}</tiny-button>
      <tiny-button  @click="team.showInviteDialog=false">取消</tiny-button>
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
import { teamStore } from '@/store';
import { inviteUser } from '@/api/space'

const team = teamStore()
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
const roleOptions = ref([{
        label: '管理员',
        value: 'admin'
      },{
        label: '只读用户',
        value: 'reader'
      },{
        label: '编辑用户',
        value: 'editor'
      }
  ])
// 表单校验规则
const rules = ref({
  description: [{ required: true, message: '必填', trigger: 'change'},
                { required: true, message: '长度介于1~255', trigger: 'change',  min: 1, max: 255 }],
  name: [{ required: true, message: '必填', trigger: 'change'},
         { required: true, message: '长度介于1~50', trigger: 'change',  min: 1, max: 50 }],
  category: [{ required: false, message: '长度介于0~10', trigger: 'change',  min: 0, max: 10 }],
  auth: [{ required: true, message: '必填', trigger: 'change' }],
  id: [{ required: false }]
})

// 表单校验规则
const inviteRules = ref({
  email: [{ required: true, message: '必填', trigger: 'change'},
          { required: true, message: '长度介于1~50', trigger: 'change',  min: 1, max: 50 }],
  role: [{ required: true, message: '必填', trigger: 'change'}],
})

const ruleFormRef = ref()
const inviteUserEnter = async () => {
  team.btnSubmit.loading = true
  ruleFormRef.value
  .validate(async(valid: any) => {
    try {
      if (valid) {
        let res = await inviteUser(team.inviteData)
        Modal.message({
          status: 'success',
          message: '邀请成功，等待用户确认加入',
        })
        team.showInviteDialog = false
      } else {
        Modal.message({
          status: 'error',
          message: '表单数据校验失败，请检查您的输入是否正确',
        })
      }
    }finally {
      team.btnSubmit.loading = false
    }

  })

}
const handleSubmit = () => {
team.btnSubmit.loading = true
ruleFormRef.value
.validate()
.then(async () => {
    await team.createTeamSpaceData()
    await team.getTeamSpaceData()
})
.catch(() => {
  Modal.message({
  message: '表单数据校验失败，请检查您的输入是否正确',
    status: 'error',
  });
}).finally(() => {
  team.btnSubmit.loading = false
})

}
</script>

<style scoped lang="less">
.createTeamSpace {
  width: 98%;
  margin: 0 auto;
}
</style>

