<template>
  <!-- <div class="main">
    <tiny-layout>
      <tiny-row :flex="true" justify="center">
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-main1.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.one') }}</span>
                <span id="up" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-up.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">3.23</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-main2.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">DOM Ready</span>
                <span id="down" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-down.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">1.56</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-mainup.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.up') }}</span>
                <span id="up" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-up.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">3.69</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-maindown.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.down') }}</span>
                <span id="down" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-down.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">0.69</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
      </tiny-row>
    </tiny-layout>
  </div> -->
  <tiny-collapse v-model="activeNames" class="demo-collapse-wrap">
    <tiny-collapse-item title="Python" name="1">
      <tiny-layout>
      <tiny-row :flex="true" justify="center">
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-main1.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.one') }}</span>
                <span id="up" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-up.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">3.23</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-main2.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">DOM Ready</span>
                <span id="down" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-down.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">1.56</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-mainup.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.up') }}</span>
                <span id="up" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-up.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">3.69</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-maindown.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.down') }}</span>
                <span id="down" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-down.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">0.69</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
        <tiny-col :span="4">
          <div class="col">
            <div class="img">
              <img src="@/assets/images/home-maindown.png" class="image" />
            </div>
            <div class="num">
              <div class="up">
                <span class="left">{{ $t('home.main.down') }}</span>
                <span id="down" class="right">
                  {{ $t('home.main.day') }}
                  <img src="@/assets/images/home-down.png" class="image" />
                  <span>0.88%</span>
                </span>
              </div>
              <div class="down">
                <span class="left">0.69</span>
                <span class="right">&nbsp;/ S</span>
              </div>
            </div>
          </div>
        </tiny-col>
      </tiny-row>
    </tiny-layout>
    </tiny-collapse-item>
    <tiny-collapse-item title="Java" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </tiny-collapse-item>
    <tiny-collapse-item title="服务器" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </tiny-collapse-item>
    <tiny-collapse-item title="后端" name="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </tiny-collapse-item>
  </tiny-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
  import {
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
    Collapse as TinyCollapse,
    CollapseItem as TinyCollapseItem
  } from '@opentiny/vue';

  const activeNames = ref(['1', '2', '3', '4']);

</script>

<style scoped lang="less">
  .main {
    padding: 0;

    .col {
      display: flex;
      justify-content: space-around;
      min-width: 396px;
      height: 150px;
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 3px 10px 0 rgb(64 98 225 / 20%);
    }

    .col:hover {
      box-shadow: 0 3px 10px 0 rgb(64 98 225 / 45%);
    }

    .img {
      display: flex;
      align-items: center;
    }

    .num {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      #up {
        span {
          color: #f7961e;
        }
      }

      #down {
        span {
          color: #3eb21f;
        }
      }

      .up {
        .left {
          margin-left: -15%;
          color: #35383e;
          font-weight: 400;
          font-size: 18px;
          letter-spacing: 0.45px;
          text-align: left;
        }

        .right {
          margin-left: 15%;
          color: #777;
          font-size: 16px;
          letter-spacing: 0.4px;
          text-align: left;
        }
      }

      .down {
        margin-left: -30px;

        .left {
          width: 99px;
          height: 36px;
          color: #242424;
          font-weight: 700;
          font-size: 36px;
          letter-spacing: 1.2px;
          text-align: left;
        }

        .right {
          width: 8px;
          height: 14px;
          color: #777;
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.4px;
          text-align: left;
        }
      }
    }
  }

  :deep(.tiny-col) {
    padding: 0 11.5px;
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-xg) {
    .main {
      display: block;
    }

    .col {
      width: 300px;
    }
  }
</style>
