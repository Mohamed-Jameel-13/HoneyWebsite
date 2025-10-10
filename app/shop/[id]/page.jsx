import Navbar from "../../../components/navbar"
import CartDrawer from "../../../components/cart-drawer"
import LoginModal from "../../../components/login-modal"
import { UIProvider } from "../../../components/cart-ui-context"
import ProductDetailContent from "./ProductDetailContent"

// Generate static paths for all products
export async function generateStaticParams() {
  return [
    { id: 'wildflower' },
    { id: 'clover' },
    { id: 'manuka' },
    { id: 'acacia' },
  ]
}

// Server component - this will be statically generated
export default function ProductDetailPage({ params }) {
  return (
    <UIProvider>
      <Navbar />
      <ProductDetailContent productId={params.id} />
      <CartDrawer />
      <LoginModal />
    </UIProvider>
  )
}