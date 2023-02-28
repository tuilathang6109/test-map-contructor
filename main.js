// Định nghĩa một lớp đối tượng sản phẩm
function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  // Tạo một mảng chứa các đối tượng sản phẩm
  let products = [
    new Product('Áo thun', 100000),
    new Product('Quần jean', 200000),
    new Product('Giày thể thao', 300000)
  ];
  
  // Lấy các phần tử UI cần thiết
  const productList = document.querySelector('.product-list');
  const form = document.querySelector('form');
  const productName = document.querySelector('#product-name');
  const productPrice = document.querySelector('#product-price');
  
  // Hiển thị danh sách sản phẩm lên trang web
  function displayProductList() {
    // Xóa nội dung hiện tại của danh sách sản phẩm
    productList.innerHTML = '';
    // Duyệt qua các sản phẩm trong mảng và thêm chúng vào danh sách
products.forEach(function(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    const productName = document.createElement('div');
    productName.classList.add('product-name');
    productName.textContent = product.name;
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.textContent = product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);
    productList.appendChild(productItem);
    });
    }
    
    // Gọi hàm hiển thị danh sách sản phẩm lên trang web
    displayProductList();
    
    // Xử lý sự kiện khi người dùng thêm sản phẩm mới
    form.addEventListener('submit', function(event) {
    // Ngăn chặn hành động mặc định của biểu mẫu (không gửi dữ liệu lên server)
    event.preventDefault();
    
    // Lấy thông tin sản phẩm mới từ biểu mẫu
    const name = productName.value;
    const price = productPrice.value;
    
    // Kiểm tra xem tên sản phẩm và giá có hợp lệ không
    if (name.trim() === '' || price === '' || isNaN(price)) {
    alert('Vui lòng nhập tên sản phẩm và giá hợp lệ!');
    return;
    }
    
    // Tạo đối tượng sản phẩm mới và thêm vào mảng sản phẩm
    const newProduct = new Product(name.trim(), parseInt(price));
    products.push(newProduct);
    
    // Hiển thị lại danh sách sản phẩm trên trang web
    displayProductList();
    
    // Xóa nội dung trong các ô nhập liệu
    productName.value = '';
    productPrice.value = '';
    });

    // Khai báo biến currentPage
let currentPage = 1;

function renderPagination() {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  // Tính toán số lượng trang
  const numPages = Math.ceil(products.length / productsPerPage);

  // Hiển thị nút Previous
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '&laquo;';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  // Hiển thị các nút số trang
  for (let i = 1; i <= numPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerHTML = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderProducts();
      renderPagination();
    });
    paginationContainer.appendChild(pageButton);
  }

  // Hiển thị nút Next
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.addEventListener('click', () => {
    if (currentPage < numPages) {
      currentPage++;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(nextButton);
}

