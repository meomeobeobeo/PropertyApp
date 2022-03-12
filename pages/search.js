import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import noResult from '../assets/img/noresult.svg';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

import SearchFilter from '../components/SearchFilter';

const Search = ({ properties }) => {
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();

    return (
        <Box cursor="pointer">
            <Flex
                onClick={() => {
                    setSearchFilter((pre) => !pre);
                }}
                cursor="pointer"
                borderBottom="1px"
                p="4"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                bg="gray.100"
            >
                <Text>Search by filter</Text>
                <Icon
                    paddingLeft="4"
                    w="8"
                    as={BsFillFilterSquareFill}
                    fontSize="40"
                />
            </Flex>
            {searchFilter && <SearchFilter />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Property {router.query.purpose}
            </Text>

            <Flex flexWrap="wrap">
                {properties.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Flex>
            {properties.length === 0 && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    marginBottom="4"
                >
                    <Image alt="no-result" src={noResult} />
                    <Text fontSize="2xl" fontWeight="bold">
                        No result found.
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default Search;

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`,
    );

    return {
        props: {
            properties: data?.hits,
        },
    };
}
