<template>
  <div class="card" v-show="team.showCard">
      <tiny-card
        ref='card'
        v-for="item in team.teamSpaceData"
        :key="item.id"
        size="medium"
        card-class="my-card"
      >
      <div class="content" @click="clickTeam(item)">
        <div class="title">
          <div style="margin-right: 16px; cursor: pointer" @click.stop>
            <GlobalOutlined v-if="item.auth === 0" />
            <UserOutlined v-else-if="item.auth === 1" />
            <UsergroupAddOutlined v-else-if="item.auth === 2" />
          </div>
          <div style="margin-right: 16px; cursor: pointer;font-size: 14px">{{item.name}}</div>
          <tiny-tag size="mini" color="blue"  v-show="item.category"  @click.stop>{{item.category}}</tiny-tag>
        </div>
        <p style="height: 70px" class="description">
          {{item.description}}
        </p>
      </div>
        <template #footer>
          <div class="card-footer">
            <div
            style="display: flex; align-items: center"
              v-for="(data, index) in options"
              :key="index"
              @click="iconClick(data, index, item)"
            >
            <component :is="data.icon" :key="index" v-if="data.text!=='详情'"/>

            <tiny-popover v-if="data.text==='详情'" placement="right" trigger="click">
              <div class="space-detail">
                <span class="item-title"><TinyIconFontWeight />空间名称</span>
                <span class="item-detail">{{item.name}}</span>
                <TinyDivider />

                <span class="item-title"><TinyIconEyeopen />可见范围</span>
                <span class="item-detail">{{item.auth_cn}}</span>
                <TinyDivider />

                <span class="item-title"><TinyIconPushpin />空间标识</span>
                <div>
                  <tiny-tag class="item-detail" size="small" color="blue" style="border-radius:18px">{{item.category}}</tiny-tag>
                </div>
                <TinyDivider />

                <span class="item-title"><TinyIconInfoCircle />空间描述</span>
                <span class="item-detail">{{item.description}}</span>
                <TinyDivider />

                <span class="item-title"><TinyIconUser />创建者</span>
                <span class="item-detail">{{item.username}}</span>
                <TinyDivider />

                <span class="item-title"><TinyIconCalendar />创建时间</span>
                <span class="item-detail">{{item.create_time}}</span>
              </div>
              <template #reference>
                <span style="display: flex;align-items: center"><component :is="data.icon" :key="index" />{{data.text}}</span>
              </template>
            </tiny-popover>
            <span v-else>{{data.text}}</span>
            </div>
          </div>


      </template>
      </tiny-card>
  </div>

  <div  v-show="!(team.showCard)" style="color: black; text-align: center">暂无团队空间</div>

</template>
<script lang="ts" setup>
import {
  GlobalOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  UserAddOutlined
} from '@ant-design/icons-vue'
import {
  Layout as TinyLayout,
  Row as TinyRow,
  Col as TinyCol,
} from '@opentiny/vue';
import { onMounted, reactive, ref, defineComponent } from 'vue'
import router from '@/router'
import { Card as TinyCard, CardGroup as TinyCardGroup, Modal,
Tag as TinyTag, Popover as TinyPopover,  Divider as TinyDivider } from '@opentiny/vue'
import { IconDel, IconWriting, IconAscending, IconShare, IconInfoCircle, IconEyeopen, IconUser, IconCalendar, IconFontWeight, IconPushpin } from '@opentiny/vue-icon'
import { teamStore } from '@/store'
import { string } from 'fp-ts';


defineComponent({
  components: {
    UserAddOutlined,
    GlobalOutlined,
    UserOutlined,
    UsergroupAddOutlined
  },
});
const TinyIconPushpin = IconPushpin()
const TinyIconFontWeight = IconFontWeight()
const TinyIconCalendar = IconCalendar()
const TinyIconUser = IconUser()
const TinyIconEyeopen = IconEyeopen()
const TinyIconInfoCircle = IconInfoCircle()
const Del = IconDel()
const Writing = IconWriting()
const Share = IconShare()


const team = teamStore()
const iconClick = (item: any, index: any, data: any) => {
let t: string = item.text
switch(t){
  case '删除':
  Modal.confirm(`这将删除名为【${data.name}】团队空间以及其下的所有知识库和文章，确定删除？`).then(async (confirmFlag: any) => {
    if (confirmFlag === 'confirm') {
      let Params = {
          teamId: data.id
      }
      team.delTeamSpace(Params)
    }
    })
      break;
  case '编辑':
      team.authDisabled = true
      team.showDialog = true
      team.flag = 'update'
      team.createData = {
        id: data.id,
        description: data.description,
        name: data.name,
        category: data.category,
        auth: data.auth
      }
      break;
  case '邀请':
      team.showInviteDialog = true
      team.inviteData.teamId = data.id
      break;
  default:
      break;
  }
}



function clickTeam(data: any) {
  router.push({ path: `/space/book`, query: { teamId: data.id,  teamName: data.name}})
}
onMounted(() => {
  team.getTeamSpaceData()
})
const options = ref([
  {
    text: '删除',
    icon: IconDel()
  },
  {
    text: '编辑',
    icon: IconWriting(),
    disabled: false
  },
  {
    text: '详情',
    icon: IconInfoCircle(),
    disabled: false
  },
  {
    text: '邀请',
    icon: UserAddOutlined,
    disabled: false
  }
])

</script>

<style scoped>
.title {
  display: flex;
  height: 50px;
  align-items: center;
}
.tiny-tag {
  /* border-radius: 0px 8px 0px 8px; */
}
.card-footer:deep(.tiny-svg) {
  margin-right: 5px;
}
.item-title {
  display: flex;
  align-items: center;
}
.space-detail:deep(.tiny-svg) {
  margin-right: 6px;
}
.item-detail {
  margin-left: 20px;
  margin-top: 10px
}
.tiny-divider--horizontal {
  margin: 15px 0;
}
.space-detail {
  padding: 10px 24px;
  width: 300px;
  display: flex;
  flex-direction: column;
}
.card:deep(.tiny-card .tiny-card__body .tiny-card--logo .tiny-card--logo__title) {
  display: flex;
  align-items: center;
}
.card-footer {
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 44px;
}
.card:deep(.tiny-card__footer-footer) {
  padding: 0;
}
.my-card {
  width: 300px;
}
.card {
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  /* background: #f5f5f5; */
  padding: 5px;
}
.card:deep(.tiny-card) {
  margin: 5px;
  cursor: pointer;
  width: 384px;
}
.card:deep(.description) {
	overflow : hidden;				/*必须结合的属性,当内容溢出元素框时发生的事情*/
	text-overflow: ellipsis;		/*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
	display: -webkit-box;			/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
	-webkit-line-clamp: 4;			/*用来限制在一个块元素显示的文本的行数。*/
	-webkit-box-orient: vertical;	/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
}
</style>
