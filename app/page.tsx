"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; 
import axios from "axios";
import logo from "./assets/logo.png";
import Select from "react-select";

const SearchPage = () => { 
  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [ownerlist, setOwnerList] = useState([])
  const [lawFirms, setLawFirms] = useState([])
  const [attorneys, setAttroneys] = useState([]) 
  const [templatesdata, setTemplateData] = useState([])
  const [filter, setFilter] = useState({
    status: "Registered",
    owner: [],
    lawFirm: [],
    attorney: [],
  }); 

  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    getdata()
  }, [])
  useEffect(() => {
    getdatatwo()
  }, [filter])
  const returnnewarray = (oldarray) => {
    const formattedOptions = oldarray.map(item => ({
      label: item.key, 
      value: item.key,
      id: item.doc_count
    }));
    return formattedOptions
  }

  const onchangestatus = (option) => {
    console.log("option", option)
  }


  const API_URL = 'https://vit-tm-task.api.trademarkia.app/api/v3/us';

  const getdata = async () => {
    setLoading(true);
    const requestBody = 
        {
            "input_query": "check",
            "input_query_type":"",
            "sort_by": "default",
            "status": [],
            "exact_match": false,
            "date_query": false,
            "owners": filter.owner,
            "attorneys": filter.attorney,
            "law_firms": filter.lawFirm,
            "mark_description_description": [],
            "classes": [],
            "page": 1,
            "rows": 10,
            "sort_order": "desc",
            "states":[],
            "counties":[]
        
    };

    try {
      const response = await axios.post(API_URL, requestBody);
    // console.log("response", response.data)
    if(response.data){
      let owners = response.data.body.aggregations.current_owners.buckets  
      let firms =  response.data.body.aggregations.law_firms.buckets 
      let attorneys = response.data.body.aggregations.attorneys.buckets  
      let tempdata = response.data.body.hits.hits
      setOwnerList(returnnewarray(owners))
      setLawFirms(returnnewarray(firms))
      setAttroneys(returnnewarray(attorneys))
      setTemplateData(tempdata)
      setNoResults(tempdata.length === 0);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true); 
    } finally {
      setLoading(false); 
  }
  };

  const getdatatwo = async () => {
    setLoading(true);
    const requestBody = 
        {
            "input_query": searchTerm && searchTerm.length>0 ? searchTerm.toLowerCase() : "check",
            "input_query_type":"",
            "sort_by": "default",
            "status": [],
            "exact_match": false,
            "date_query": false,
            "owners": filter.owner,
            "attorneys": filter.attorney,
            "law_firms": filter.lawFirm,
            "mark_description_description": [],
            "classes": [],
            "page": 1,
            "rows": 10,
            "sort_order": "desc",
            "states":[],
            "counties":[]
        
    };

    try {
      const response = await axios.post(API_URL, requestBody);
    // console.log("response", response.data)
    if(response.data){
      let tempdata = response.data.body.hits.hits
      setTemplateData(tempdata)
      setNoResults(tempdata.length === 0);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log("Search Term:", searchTerm); 
    getdatatwo()
  }; 

  

  const handleOwnerChange = (selectedOptions) => {
    console.log("selected", selectedOptions)
    const owners = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilter({ ...filter, owner: owners});  
    getdatatwo()
  };

  const handlelawFirmChange = (selectedOptions) => {
    const selectedLawFirms = selectedOptions
    ? selectedOptions.map((option) => option.value)
    : [];
    console.log("selectedlawfirms", selectedLawFirms)
  // Update the filter state by merging the new lawFirms array with existing values
  // setFilter(prevFilter => ({
  //   ...prevFilter,
  //   lawFirm: selectedLawFirms
  // })); 
  setFilter({...filter, lawFirm : selectedLawFirms})
  console.log("lawfirm", filter.lawFirm)
  getdatatwo()
  };

  const handleAttorneysChange = (selectedOptions) => {
    const attorneys = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilter({ ...filter, attorney: attorneys });
    getdatatwo()
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <div className="flex-grow md:flex md:items-center justify-center">
      {loading && <div className="text-black flex items-center">
        <div className="flex items-center">
        <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className=" text-black">Loading...</span>
    </div>
</div>
        </div>}
      {!loading && noResults && <div className="text-black">No results found</div>}

      </div>

      {!loading && !noResults && (
      <div>
         {/* Header */}
         <header className="text-center mb-6">
          <Image src={logo} alt="Trademark Logo" width={200} height={100} />
        </header>

        {/* Search bar */}
        <div className="bg-white p-4 shadow-md rounded-md mb-4 flex items-center md:w-1/2 md:ml-4">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-5 w-5 text-gray-500"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </span>
            <input
              type="text"
              className="border p-2 pl-10 w-full text-black"
              placeholder="Search Trademark: Here e.g., Nike"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded flex-shrink-0 px-6 ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      <div className="flex-grow w-full">
        <div className=" md:flex justify-center">
          {/* Trademark Results */}
          <div className="bg-white p-4 shadow-md rounded-md text-black overflow-y-auto md:flex hidden">
            {/* <h3 className="font-bold mb-4">Trademark Results</h3> */}
            <div>
              <div className="flex items-center justify-between border-b py-4">
                <h1 className="font-bold">Mark</h1>
                <h1 className="font-bold">Details</h1>
                <h1 className="font-bold">Status</h1>
                <h1 className="font-bold">Class/Description</h1>
              </div>
              {templatesdata.map((result, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 items-start border-b py-4"
                >
                  {/* Left column for icon */}
                  <div className="flex items-center col-span-1">
                    <div className="mr-4">
                    <svg
                          width="56"
                          height="62"
                          viewBox="0 0 56 62"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M20.3156 18.8327L25.9072 13.2411L32.5025 19.8364L26.9109 25.428L20.3156 18.8327Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M29.1376 27.9668C28.6558 28.4485 27.8747 28.4485 27.3929 27.9668C26.9111 27.485 26.9111 26.7039 27.3929 26.2221L33.2978 20.3171C33.7796 19.8354 34.5607 19.8354 35.0425 20.3171C35.5243 20.7989 35.5243 21.58 35.0425 22.0618L29.1376 27.9668Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M19.5198 18.349C19.0381 18.8307 18.2569 18.8307 17.7751 18.349C17.2934 17.8672 17.2934 17.0861 17.7751 16.6043L23.6801 10.6993C24.1618 10.2176 24.943 10.2176 25.4248 10.6993C25.9065 11.1811 25.9065 11.9622 25.4248 12.444L19.5198 18.349Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M22.9646 21.481L24.2619 22.7782L14.8675 32.1722C14.5092 32.5305 13.9256 32.5277 13.5673 32.1694C13.3881 31.9902 13.2999 31.757 13.2999 31.5223C13.2999 31.2874 13.3909 31.0542 13.5701 30.875L22.9646 21.481Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M20.9531 32.4289C20.9531 31.0945 22.0436 29.9957 23.3887 29.9957H35.134C36.4792 29.9957 37.5698 31.0946 37.5698 32.4289H20.9531Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M51.2449 41.9627C46.5341 38.0743 39.5053 38.7477 35.6174 43.458C31.7291 48.1688 32.4025 55.1975 37.1128 59.0854C41.8236 62.9738 48.8523 62.3004 52.7402 57.5901C56.6285 52.8798 55.9557 45.8511 51.2449 41.9627ZM49.1513 44.5048C51.9177 46.7481 52.7402 50.5612 51.3194 53.7017C51.2448 53.8514 51.0206 53.926 50.8709 53.7763L39.73 44.5799C39.5803 44.4302 39.5803 44.2059 39.73 44.1313C42.5715 42.187 46.3848 42.262 49.1512 44.5048L49.1513 44.5048ZM39.2065 56.6183C36.4401 54.375 35.6176 50.5619 37.0384 47.4215C37.113 47.2718 37.3372 47.1972 37.4869 47.3469L48.7028 56.5438C48.8525 56.6935 48.8525 56.9177 48.7028 56.9923C45.8613 58.9363 41.9736 58.8616 39.2066 56.6183H39.2065Z"
                            fill="#C8C8C8"
                          />
                        </svg>
                    </div>
                  </div>

                  {/* Middle column for name and owner */}
                  <div className="flex items-center col-span-1">
                    <div>
                      <p className="font-bold">{result._source.law_firm}</p>
                      <p className="text-sm text-gray-600">{result._source.current_owner}</p>
                    </div>
                  </div>

                  {/* Middle column for status */}
                  <div className="text-green-500 font-bold text-center col-span-1">
                    {result._source.status_type.toUpperCase()}
                  </div>

                  {/* Right column for description and classes */}
                  <div className="text-gray-600 col-span-1">
                    <p>{result._source.mark_description_description[0].slice(0, 80) + '...'}</p>
                    <div className="flex items-center flex-wrap">
                      {result._source.class_codes.map((classItem, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="flex mx-2">
                            <span>
                              <svg
                                width="22"
                                height="25"
                                viewBox="0 0 22 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.60627 16.1584C7.00197 16.3496 7.47773 16.1838 7.66891 15.7881C7.86009 15.3924 7.69429 14.9166 7.29859 14.7254C6.90289 14.5343 6.42713 14.7001 6.23595 15.0958C6.04477 15.4915 6.21057 15.9672 6.60627 16.1584Z"
                                  fill="#575757"
                                />
                                <path
                                  d="M8.72149 19.7254C9.48936 20.0964 10.4126 19.7747 10.7836 19.0068C11.1546 18.2389 10.8328 17.3157 10.065 16.9447C9.29709 16.5737 8.37386 16.8954 8.00287 17.6633C7.63188 18.4312 7.95362 19.3544 8.72149 19.7254Z"
                                  fill="#575757"
                                />
                                <path
                                  d="M15.3535 11.1218L17.5293 6.61839L18.0585 6.87407C18.4331 7.05504 18.8835 6.89808 19.0645 6.52351C19.2454 6.14891 19.0885 5.69851 18.7139 5.51754C18.5365 5.43181 11.5273 2.04538 11.0317 1.80595C10.6571 1.62498 10.2067 1.78195 10.0258 2.15651C9.84479 2.53108 10.0017 2.98148 10.3763 3.16245L10.9055 3.41814L8.72974 7.92159C1.76832 8.56705 -0.114647 18.1719 6.35274 21.2965C12.8288 24.4254 19.1741 16.9749 15.3535 11.1218ZM9.24151 9.39842C9.52139 9.38916 9.77301 9.22537 9.89482 8.97325L12.262 4.07357L16.1727 5.96298L13.8055 10.8627C13.6837 11.1148 13.7118 11.4137 13.8784 11.6387C15.0548 13.2269 15.189 14.8731 14.8169 16.2646L10.5158 14.1866C10.8053 13.4928 10.504 12.683 9.81896 12.352L6.02486 10.519C6.83805 9.88053 7.90103 9.44287 9.24151 9.39842ZM7.00813 19.94C3.58416 18.2857 3.09516 14.3112 4.94218 11.669L9.09449 13.6752C8.80492 14.3689 9.1063 15.1788 9.7913 15.5097L14.2403 17.6592C12.8616 20.0657 9.91467 21.3443 7.00813 19.94Z"
                                  fill="#575757"
                                />
                              </svg>
                            </span>
                            <p>{classItem}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="md:flex flex-col mb-4 md:ml-8 h-full hidden">
            {/* Status Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mt-8 md:mt-0 mb-4">
              <h3 className="font-bold mb-2 text-black">Status</h3>
              <div className="flex flex-wrap gap-2 text-black">
                {["All", "Registered", "Pending", "Abandoned", "Others"].map(
                  (status) => (
                    <div
                      key={status}
                      className={`status-button ${
                        filter.status === status ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={`status-${status}`}
                        name="status"
                        value={status}
                        checked={filter.status === status}
                        onChange={() => setFilter((prev) => ({ ...prev, status }))}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`status-${status}`}
                        className="status-label"
                      >
                        {status}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Owner Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mb-4 text-black">
              <h3 className="font-bold mb-2 text-black">Owner</h3>
              <Select
                isMulti
                options={ownerlist}
                value={ownerlist.filter((option) =>
                  filter.owner.includes(option.value)
                )}
                onChange={handleOwnerChange}
                placeholder="Select Owners"
                className="w-full"
              />
            </div>

            {/* Law Firm Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mb-4 text-black">
              <h3 className="font-bold mb-2">Law Firm</h3>
              <Select
                isMulti
                options={lawFirms}
                value={lawFirms.filter((option) =>
                  filter.lawFirm.includes(option.value)
                )}
                onChange={handlelawFirmChange}
                placeholder="Select Law Firm"
                className="w-full"
              />
            </div>

            {/* Attorney Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full text-black">
              <h3 className="font-bold mb-2">Attorney</h3>
              <Select
                isMulti
                options={attorneys}
                value={attorneys.filter((option) =>
                  filter.attorney.includes(option.value)
                )}
                onChange={handleAttorneysChange}
                placeholder="Select Attorneys"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* for small screens widgets alignment be line */}

        <div className="block md:hidden">
          {/* Filters*/}
          <div className="flex flex-col justify-between mb-4 md:ml-8 h-full">
            {/* Status Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mb-4">
              <h3 className="font-bold mb-2 text-black">Status</h3>
              <div className="flex flex-wrap gap-2 text-black">
                {["All", "Registered", "Pending", "Abandoned", "Others"].map(
                  (status) => (
                    <div
                      key={status}
                      className={`status-button ${
                        filter.status === status ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={`status-${status}`}
                        name="status"
                        value={status}
                        checked={filter.status === status}
                        onChange={() => setFilter({ ...filter, status })}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`status-${status}`}
                        className="status-label"
                      >
                        {status}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Owner Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mb-4 text-black">
              <h3 className="font-bold mb-2 text-black">Owner</h3>
              <Select
                isMulti
                options={ownerlist}
                value={ownerlist.filter((option) =>
                  filter.owner.includes(option.value)
                )}
                onChange={handleOwnerChange}
                placeholder="Select Owners"
                className="w-full"
              />
            </div>
            {/* Law Firm Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full mb-4 text-black">
              <h3 className="font-bold mb-2">Law Firm</h3>
              <Select
                isMulti
                options={lawFirms}
                value={lawFirms.filter((option) =>
                  filter.lawFirm.includes(option.value)
                )}
                onChange={handlelawFirmChange}
                placeholder="Select Law Firm"
                className="w-full"
              />
            </div>

            {/* Attorney Filter */}
            <div className="bg-white p-4 shadow-md rounded-md w-full text-black">
              <h3 className="font-bold mb-2">Attorney</h3>
              <Select
                isMulti
                options={attorneys}
                value={attorneys.filter((option) =>
                  filter.attorney.includes(option.value)
                )}
                onChange={handleAttorneysChange}
                placeholder="Select Attorneys"
                className="w-full"
              />
            </div>

            {/* Trademark Results */}
            <div className="bg-white p-4 shadow-md rounded-md text-black overflow-y-auto flex-grow">
              {/* <h3 className="font-bold mb-4">Trademark Results</h3> */}
              <div>
                <div className="flex items-center justify-between border-b py-4">
                  <h1 className="font-bold">Mark</h1>
                  <h1 className="font-bold">Details</h1>
                  <h1 className="font-bold">Status</h1>
                  <h1 className="font-bold">Class/Description</h1>
                </div>
                {templatesdata.map((result, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start border-b py-4"
                  >
                    {/* Column 1: Icon and Name/Owner */}
                    <div className="flex items-center">
                      <div className="mr-4">
                        <svg
                          width="56"
                          height="62"
                          viewBox="0 0 56 62"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M49.226 0.613403H1.82021C1.37165 0.613403 0.923096 0.987373 0.923096 1.51051V57.6647C0.923096 58.1133 1.29706 58.5619 1.82021 58.5619L31.9536 58.5624C32.2524 58.5624 32.4772 58.1884 32.3275 57.8895C29.2617 52.9544 29.486 46.4493 33.4489 41.6639C34.2714 40.6171 35.2436 39.7946 36.2904 39.0466C36.6644 38.8223 36.4401 38.2986 36.0661 38.2986L5.11027 38.2992C5.03568 38.2992 4.96057 38.2246 4.96057 38.1495V4.42702C4.96057 4.35244 5.03516 4.27733 5.11027 4.27733H45.8613C45.9359 4.27733 46.011 4.35191 46.011 4.42702V36.3549C46.011 36.5792 46.1607 36.7289 46.385 36.7289C47.4318 36.8786 48.4786 37.1775 49.5255 37.626C49.8243 37.7757 50.1237 37.5514 50.1237 37.252V1.51073C50.1237 0.987589 49.7497 0.613619 49.2266 0.613619L49.226 0.613403Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M20.3156 18.8327L25.9072 13.2411L32.5025 19.8364L26.9109 25.428L20.3156 18.8327Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M29.1376 27.9668C28.6558 28.4485 27.8747 28.4485 27.3929 27.9668C26.9111 27.485 26.9111 26.7039 27.3929 26.2221L33.2978 20.3171C33.7796 19.8354 34.5607 19.8354 35.0425 20.3171C35.5243 20.7989 35.5243 21.58 35.0425 22.0618L29.1376 27.9668Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M19.5198 18.349C19.0381 18.8307 18.2569 18.8307 17.7751 18.349C17.2934 17.8672 17.2934 17.0861 17.7751 16.6043L23.6801 10.6993C24.1618 10.2176 24.943 10.2176 25.4248 10.6993C25.9065 11.1811 25.9065 11.9622 25.4248 12.444L19.5198 18.349Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M22.9646 21.481L24.2619 22.7782L14.8675 32.1722C14.5092 32.5305 13.9256 32.5277 13.5673 32.1694C13.3881 31.9902 13.2999 31.757 13.2999 31.5223C13.2999 31.2874 13.3909 31.0542 13.5701 30.875L22.9646 21.481Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M20.9531 32.4289C20.9531 31.0945 22.0436 29.9957 23.3887 29.9957H35.134C36.4792 29.9957 37.5698 31.0946 37.5698 32.4289H20.9531Z"
                            fill="#C8C8C8"
                          />
                          <path
                            d="M51.2449 41.9627C46.5341 38.0743 39.5053 38.7477 35.6174 43.458C31.7291 48.1688 32.4025 55.1975 37.1128 59.0854C41.8236 62.9738 48.8523 62.3004 52.7402 57.5901C56.6285 52.8798 55.9557 45.8511 51.2449 41.9627ZM49.1513 44.5048C51.9177 46.7481 52.7402 50.5612 51.3194 53.7017C51.2448 53.8514 51.0206 53.926 50.8709 53.7763L39.73 44.5799C39.5803 44.4302 39.5803 44.2059 39.73 44.1313C42.5715 42.187 46.3848 42.262 49.1512 44.5048L49.1513 44.5048ZM39.2065 56.6183C36.4401 54.375 35.6176 50.5619 37.0384 47.4215C37.113 47.2718 37.3372 47.1972 37.4869 47.3469L48.7028 56.5438C48.8525 56.6935 48.8525 56.9177 48.7028 56.9923C45.8613 58.9363 41.9736 58.8616 39.2066 56.6183H39.2065Z"
                            fill="#C8C8C8"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-black">{result._source.law_firm}</p>
                        <p className="text-sm text-gray-600">{result._source.current_owner}</p>
                      </div>
                    </div>

                    {/* Column 2: Status */}
                    <div className="text-green-500 font-bold text-center">
                      {result._source.status_type.toUpperCase()}
                    </div>

                    {/* Column 3: Description */}
                    <div className="text-gray-600">
                      <p>{result._source.mark_description_description[0].slice(0, 80) + '...'}</p>
                    </div>

                    {/* Column 4: Classes */}
                    <div className="text-gray-600 col-span-1">
                      <div className="flex flex-wrap items-center">
                        {result._source.class_codes.map((classItem, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="flex mx-2 items-center">
                              <span>
                                <svg
                                  width="22"
                                  height="25"
                                  viewBox="0 0 22 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.60627 16.1584C7.00197 16.3496 7.47773 16.1838 7.66891 15.7881C7.86009 15.3924 7.69429 14.9166 7.29859 14.7254C6.90289 14.5343 6.42713 14.7001 6.23595 15.0958C6.04477 15.4915 6.21057 15.9672 6.60627 16.1584Z"
                                    fill="#575757"
                                  />
                                  <path
                                    d="M8.72149 19.7254C9.48936 20.0964 10.4126 19.7747 10.7836 19.0068C11.1546 18.2389 10.8328 17.3157 10.065 16.9447C9.29709 16.5737 8.37386 16.8954 8.00287 17.6633C7.63188 18.4312 7.95362 19.3544 8.72149 19.7254Z"
                                    fill="#575757"
                                  />
                                  <path
                                    d="M15.3535 11.1218L17.5293 6.61839L18.0585 6.87407C18.4331 7.05504 18.8835 6.89808 19.0645 6.52351C19.2454 6.14891 19.0885 5.69851 18.7139 5.51754C18.5365 5.43181 11.5273 2.04538 11.0317 1.80595C10.6571 1.62498 10.2067 1.78195 10.0258 2.15651C9.84479 2.53108 10.0017 2.98148 10.3763 3.16245L10.9055 3.41814L8.72974 7.92159C1.76832 8.56705 -0.114647 18.1719 6.35274 21.2965C12.8288 24.4254 19.1741 16.9749 15.3535 11.1218ZM9.24151 9.39842C9.52139 9.38916 9.77301 9.22537 9.89482 8.97325L12.262 4.07357L16.1727 5.96298L13.8055 10.8627C13.6837 11.1148 13.7118 11.4137 13.8784 11.6387C15.0548 13.2269 15.189 14.8731 14.8169 16.2646L10.5158 14.1866C10.8053 13.4928 10.504 12.683 9.81896 12.352L6.02486 10.519C6.83805 9.88053 7.90103 9.44287 9.24151 9.39842ZM7.00813 19.94C3.58416 18.2857 3.09516 14.3112 4.94218 11.669L9.09449 13.6752C8.80492 14.3689 9.1063 15.1788 9.7913 15.5097L14.2403 17.6592C12.8616 20.0657 9.91467 21.3443 7.00813 19.94Z"
                                    fill="#575757"
                                  />
                                </svg>
                              </span>
                              <p>{classItem}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      )}
      
    </div>
  );
};

export default SearchPage;
