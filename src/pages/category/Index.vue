 <template>
  <div>
    <a-row :gutter="24" style>
      <a-col :span="6">
        <a-card title="分类列表" style="height:calc(100vh - 164px)">
          <a slot="extra" href="#" @click.prevent="resetEdit">新增</a>
          <a-tree
            :tree-data="categories"
            :replaceFields="{children:'children', title:'name', key:'id' }"
            @select="onSelectCategory"
            @expand="onExpand"
            :expandedKeys="expandedCategories"
            :autoExpandParent="autoExpandParent"
          ></a-tree>
        </a-card>
      </a-col>
      <a-col :span="12" style="margin-top:50px;">
        <a-form
          :form="editForm"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit.prevent="createOrUpdateCategory"
        >
          <a-form-item label="分类名称">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入分类名称!' }] }]" />
          </a-form-item>
          <a-form-item label="上级分类">
            <a-select v-decorator="['parentCategoryId']" placeholder="无上级分类" allowClear>
              <a-select-option
                v-for="category in allCategories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="排序">
            <a-input-number
              id="inputNumber"
              v-decorator="['priority',{initialValue:99}]"
              :min="1"
              :max="1000000"
            />
          </a-form-item>
          <a-form-item label="分类描述">
            <a-textarea
              placeholder
              v-decorator="['description']"
              :auto-size="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
class EditCategoryModel {
  id = null;
  name = "";
  description = "";
  priority = 99;
  parentCategoryId = null;

  constructor({ name, description, priority, parentCategoryId }) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.parentCategoryId = parentCategoryId;
  }

  reset() {
    this.name = "";
    this.description = "";
    this.priority = 99;
    this.parentCategoryId = null;
  }
}

export default {
  data() {
    return {
      expandedCategories: [],
      searchValue: "",
      autoExpandParent: true,
      allCategories: [],
      categories: [],
      currentEditId: Symbol(),
      editForm: this.$form.createForm(this, {
        name: "editForm",
        initialValue: new EditCategoryModel({ })
      })
    };
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedCategories = expandedKeys;
      this.autoExpandParent = false;
    },
    getCategories() {
      this.$http.get("/api/v1/categories").then(categories => {
        this.allCategories = Object.assign([], categories);

        this.categories = [];

        if (categories) {
          var topCategories = categories.filter(x => !x.parentCategoryId);
          this.poulateSubCategories(topCategories, categories);

          this.categories = topCategories;
        }

        this.expandedCategories = this.allCategories.map(c => c.id);
      });
    },
    poulateSubCategories(topCategories, categories) {
      for (var topCategory of topCategories) {
        var subCategories = categories.filter(
          x => x.parentCategoryId === topCategory.id
        );
        topCategory.children = subCategories;
        if (subCategories && subCategories.length > 0) {
          this.poulateSubCategories(subCategories, categories);
        }
      }
    },
    createOrUpdateCategory() {
      new Promise((resolve,reject)=>{
        this.editForm.validateFields((err, formValue) => err ? reject(err) : resolve(formValue))
      })
      .then((formValue)=> (this.currentEditId ? this.update : this.create)(formValue))
      .catch((err)=>this.$notification.warning({
            message: "表单校验失败，请检查！",
            description: ""
      }));
    },
    create(formValue) {
      this.$http.post("/api/v1/categories", formValue).then(() => {
        this.$notification.success({
          message: "新增分类成功",
          description: ""
        });
        this.resetEdit();
        this.getCategories();
      });
    },
    update(formValue) {
      this.$http
        .put(`/api/v1/categories/${this.currentEditId}`, formValue)
        .then(() => {
          this.$notification.success({
            message: "更新分类成功",
            description: ""
          });
          this.getCategories();
        });
    },
    resetEdit() {
      this.currentEditId = Symbol();
      this.editForm.resetFields();
    },
    onSelectCategory([selectKey]) {
      let category = this.allCategories.find(x => x.id == selectKey);
      this.currentEditId = selectKey;
      this.editForm.setFieldsValue(new EditCategoryModel(category));
    },
    addSubCategory() {}
  },
  mounted() {},
  created() {
    this.getCategories();
  }
};
</script>