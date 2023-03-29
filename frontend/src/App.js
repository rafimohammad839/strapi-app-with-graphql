import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Homepage from './pages/Homepage'
import Category from './pages/Category'
import ReviewDetails from './pages/ReviewDetails'
import SideHeader from './components/SideHeader';

// Apollo Client set-up
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SideHeader />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/details/:id" element={<ReviewDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
