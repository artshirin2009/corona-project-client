 <template>
  <div class="about">
    <h1>Courses</h1>
        
          <left-sidebar></left-sidebar>
        
          <product-grid></product-grid>
       
    
    
  </div>
</template>
<script>
import LeftSidebar from "../components/helpers/LeftSidebar";
import ProductGrid from "../components/helpers/ProductGrid";
export default {
  components: {
    LeftSidebar,
    ProductGrid
  }
};
</script>