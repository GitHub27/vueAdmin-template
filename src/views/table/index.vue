<template>
  <div class="app-container">
    <el-container class="btn-wrap">
      <el-button><i class="el-icon-edit el-icon--left"></i>项目修改</el-button>
      <el-button type="primary"><i class="el-icon-document el-icon--left"></i>项目延续</el-button>    
      <el-button><i class="el-icon-search el-icon--left"></i>中期检查</el-button>
      <el-button><i class="el-icon-check el-icon--left"></i>项目结算</el-button>
      <el-tooltip class="item" effect="dark" content="删除" placement="top">
        <el-button><i class="el-icon-delete"></i></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="分享" placement="top">
        <el-button><i class="el-icon-share"></i></el-button>
      </el-tooltip>
      <el-select class="my-select" v-model="value1" placeholder="请选择申请中心">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="my-select" v-model="value2" placeholder="请选择年份">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-container>
    <!-- <el-container>
      申请中心：{{value1}}
    </el-container> -->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      // 申请中心选项
      options1: [{
          value: '选项1',
          label: '中心1'
        }, {
          value: '选项2',
          label: '中心2'
        }, {
          value: '选项3',
          label: '中心3'
        }, {
          value: '选项4',
          label: '中心4'
        }, {
          value: '选项5',
          label: '中心5'
        }],
        //　申请中心选中值
        value1: '',
        // 年份选项
      options2: [{
          value: '2019',
          label: '2019'
        }, {
          value: '2018',
          label: '2018'
        }, {
          value: '2017',
          label: '2017'
        }],
        //　年份选中值
        value2: '' // value2: '2019' 代表默认值为2019
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.my-select {
  margin-left: 10px;
}
</style>