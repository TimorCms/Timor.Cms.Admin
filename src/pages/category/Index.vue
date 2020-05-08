 <template>
  <div>
    <a-row :gutter="24">
      <a-col :span="6">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :show-line="true"
          :tree-data="categories"
          :replaceFields="{children:'children', title:'name', key:'id' }"
          @expand="onExpand"
        >
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span
                style="color: #f50"
              >{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </a-col>
      <a-col :span="12">col-12</a-col>
    </a-row>
  </div>
</template>

<script>
import httpClient from "../../core/services/httpclient";

export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      categories: []
    };
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      console.log(e);
    },
    getCategories() {
      httpClient.get("/api/v1/categories").then(categories => {
        categories = [
          {
            id: "5ea54fc7b3e8870292811f34",
            name: "顶级分类",
            description: "分类描述在这里",
            priority: 0,
            parentCategoryId: null
          },
          {
            id: "5ea54fc7b3e8870292811f35",
            name: "顶级分类2",
            description: "分类描述在这里",
            priority: 0,
            parentCategoryId: null
          },
          {
            id: "5ea54fc7b3e8870292811f36",
            name: "一级子分类",
            description: "分类描述在这里",
            priority: 0,
            parentCategoryId: "5ea54fc7b3e8870292811f34"
          },
          {
            id: "5ea54fc7b3e8870292811f37",
            name: "二级子分类",
            description: "分类描述在这里",
            priority: 0,
            parentCategoryId: "5ea54fc7b3e8870292811f36"
          }
        ];

        this.categories = [];

        if (categories) {
          var topCategories = categories.filter(x => !x.parentCategoryId);
          this.poulateSubCategories(topCategories, categories);

          this.categories = topCategories;
        }
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
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>