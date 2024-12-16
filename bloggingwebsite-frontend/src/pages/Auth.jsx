import React from 'react'
import { Formik,Form,Field } from 'formik'
import { Link, useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Auth = () => {
  const isRegistered=useMatch('/register');
  const navigate=useNavigate();
  //just like usestate
  const initialLoginDetails={email:'',password:''};
  async function submit(values,actions){
      console.log(values);
      try{
        const isAuth=true;
        if(isAuth){
          const responce=await axios.post('http://localhost:3001/api/users/register',values);
          console.log(responce);
          navigate('/')
        }
      }
      catch(err){
        console.log(err);
        alert(err);
      }
  }
  return (
    <div>
        <div className='mx-auto pt-10 w-full mt-14'>
            <div className='flex justify-center'>
                <div className=''>
                    <h1 className='text-2xl font-bold text-center'> Sign {isRegistered!=null ? 'Up' : 'in'}</h1>
                    <Link to={isRegistered!=null ? '/login' : '/register'}><p className='text-md text-center font-medium text-red-500'>{isRegistered!=null ? 'Already have an' : 'Not created'} account</p></Link>
                    <Formik initialValues={isRegistered ? {...initialLoginDetails,name:''} : initialLoginDetails} onSubmit={submit}>
                      {
                        ()=>(
                          <>
                            {/* <FormErrors/> */}
                            <Form>
                              <fieldset className='flex flex-col'>
                              {
                                isRegistered!=null && <Field
                                 type='text'
                                  name='name'
                                  placeholder='Your name'
                                  className='border border-zinc-700 w-99 m-2 p-4 rounded-full'
                                />
                              }
                                
                                <Field
                                 type='email'
                                  name='email'
                                  placeholder='Your email'
                                  className='border border-zinc-700 w-96 m-2 p-4 rounded-full'
                                />
                                <Field
                                 type='password'
                                  name='password'
                                  placeholder='Your password'
                                  className='border border-zinc-700 w-96 m-2 p-4 rounded-full'
                                />
                                <button type='submit' className='rounded-lg ml-auto bg-green-600 p-4 mr-3'>Sign {isRegistered!=null ? 'up' : 'in'}</button>

                              </fieldset>
                            </Form>
                          </>
                        )
                      }
                    </Formik>
                </div>
                
                
            </div>
        </div>



    </div>
  )
}

export default Auth