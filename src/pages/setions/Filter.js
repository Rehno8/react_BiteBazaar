// import React, { useContext } from 'react';
// import { Select, Input, Button } from 'antd';
// import { ModeContext } from '../../contexts/ModeContext';

// export default function Filter({ selectedCategory, setSelectedCategory }) {
//     const { searchKey, setSearchKey, filterPrice, setFilterPrice } = useContext(ModeContext);

//     const handleResetFilters = () => {
//         setSearchKey('');
//         setSelectedCategory('');
//         setFilterPrice('');
//     };

//     return (
//         <div>
//             <Input
//                 placeholder="Search products"
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
//                 style={{ marginBottom: '16px' }}
//             />
//             <Select
//                 size='large'
//                 showSearch
//                 placeholder="Select a product category"
//                 optionFilterProp="label"
//                 value={selectedCategory}
//                 onChange={setSelectedCategory}
//                 style={{ marginBottom: '16px' }}
//                 options={[
//                     { value: 'shirts', label: 'Shirts' },
//                     { value: 'jackets', label: 'Jackets' },
//                     { value: 'mobile', label: 'Mobile' },
//                 ]}
//             />
//             <Select
//                 size='large'
//                 placeholder="Filter by price"
//                 value={filterPrice}
//                 onChange={setFilterPrice}
//                 style={{ marginBottom: '16px', width: '100%' }}
//                 options={[
//                     { value: '0-1000', label: '$0 - $1000' },
//                     { value: '1000-5000', label: '$1000 - $5000' },
//                     { value: '5000-10000', label: '$5000 - $10000' },
//                     { value: '10000+', label: '$10000+' },
//                 ]}
//             />
//             <Button type="primary" onClick={handleResetFilters}>
//                 Reset Filters
//             </Button>
//         </div>
//     );
// }



import React, { useContext } from 'react';
import { Select, Input, Button } from 'antd';
import { ModeContext } from '../../contexts/ModeContext';

export default function Filter({ selectedCategory, setSelectedCategory }) {
    const { searchKey, setSearchKey, filterPrice, setFilterPrice } = useContext(ModeContext);

    const handleResetFilters = () => {
        setSearchKey('');
        setSelectedCategory('');
        setFilterPrice('');
    };

    return (
        <div className="filter-container" style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h2 className="filter-title" style={{ textAlign: 'center', marginBottom: '16px' }}>Filter Our Menu</h2>
            <Input
                placeholder="Search for dishes, drinks, or ingredients"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                style={{ marginBottom: '16px', borderRadius: '4px' }}
            />
            <Select
                size='large'
                showSearch
                placeholder="Select a dish category"
                optionFilterProp="label"
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ marginBottom: '16px', borderRadius: '4px' }}
                options={[
                    { value: 'appetizers', label: 'Appetizers' },
                    { value: 'main_courses', label: 'Main Courses' },
                    { value: 'desserts', label: 'Desserts' },
                    { value: 'beverages', label: 'Beverages' },
                ]}
            />
            <Select
                size='large'
                placeholder="Filter by price range"
                value={filterPrice}
                onChange={setFilterPrice}
                style={{ marginBottom: '16px', width: '100%', borderRadius: '4px' }}
                options={[
                    { value: '0-10', label: '$0 - $10' },
                    { value: '10-30', label: '$10 - $30' },
                    { value: '30-50', label: '$30 - $50' },
                    { value: '50+', label: '$50+' },
                ]}
            />
            <Button type="primary" onClick={handleResetFilters} style={{ width: '100%', borderRadius: '4px' }}>
                Reset Filters
            </Button>
        </div>
    );
}
