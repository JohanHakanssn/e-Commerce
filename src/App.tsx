import ReduxTest from 'components/ReduxTest/ReduxTest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Products from 'pages/Products/Products';
import Cart from 'pages/Cart/Cart';
import Admin from 'pages/Admin/Admin';
import './App.css';
import AdminLogin from 'pages/Admin/pages/AdminLogin';
import NewProduct from 'pages/Admin/pages/NewProduct/NewProduct';
import UpdateProduct from 'pages/Admin/pages/UpdateProduct/UpdateProduct';
import EditStore from 'pages/Admin/pages/EditStore';
import AdminMain from 'pages/Admin/pages/AdminMain';
import Store from 'pages/Store/Store';
import NotFound from 'components/NotFound/NotFound';
import AdminNotFound from 'pages/Admin/components/AdminNotFound/AdminNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Catergories from 'pages/Categories/Categories';
import {
	ShoesPage,
	ShortsPage,
	PantsPage,
	TShirtsPage,
	JacketsPage,
	HatsPage,
	HoodiesPage,
	SweatshirtsPage,
	SweatersPage,
	ShirtsPage,
	BagsPage,
	DressesPage,
	SkirtsPage,
} from 'pages/Categories/Shorts/Shorts';

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ToastContainer />
				<Router>
					<Routes>
						<Route path='/' />
						<Route element={<Store />}>
							<Route index element={<Home />} />
							<Route path='home' element={<Home />} />
							<Route path='products' element={<Products />} />
							<Route path='cart' element={<Cart />} />
							<Route path='categories' element={<Catergories />} />
							<Route path='Shorts' element={<ShortsPage />} />
							<Route path='Shoes' element={<ShoesPage />} />
							<Route path='Pants' element={<PantsPage />} />
							<Route path='T-Shirts' element={<TShirtsPage />} />
							<Route path='Jackets' element={<JacketsPage />} />
							<Route path='Hats' element={<HatsPage />} />
							<Route path='Hoodies' element={<HoodiesPage />} />
							<Route path='Sweatshirts' element={<SweatshirtsPage />} />
							<Route path='Sweaters' element={<SweatersPage />} />
							<Route path='Shirts' element={<ShirtsPage />} />
							<Route path='Bags' element={<BagsPage />} />
							<Route path='Dresses' element={<DressesPage />} />
							<Route path='Skirts' element={<SkirtsPage />} />
							<Route path='redux-test' element={<ReduxTest />} />
							<Route path='*' element={<NotFound />} />
						</Route>
						<Route path='/admin' element={<Admin />}>
							<Route index element={<AdminLogin />} />
							<Route path='login' element={<AdminLogin />} />
							<Route path='main' element={<AdminMain />} />
							<Route path='new-product' element={<NewProduct />} />
							<Route path='update-product' element={<UpdateProduct />} />
							<Route path='edit-store' element={<EditStore />} />
							<Route path='*' element={<AdminNotFound />} />
						</Route>
					</Routes>
				</Router>
			</QueryClientProvider>
		</>
	);
}
export default App;

