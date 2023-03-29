import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      data {
        id,
        attributes {
          name
        }
      }
    }
  }
`

export default function SideHeader() {

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error 😞</p>

  return (
    <div className='site-header'>
      <Link to='/'><h1>Ninja Reviews</h1></Link>
      <nav className="categories">
        <span>Filter reviews by category: </span>
        {data.categories.data.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
