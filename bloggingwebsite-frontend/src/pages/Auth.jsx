import React from 'react'
import { Formik,Form,Field } from 'formik'
import { Link, useMatch, useNavigate } from 'react-router-dom';
const Auth = () => {
  const isRegistered=useMatch('/register');
  const navigate=useNavigate();
  //just like usestate
  const initialLoginDetails={email:'',password:''};
  async function submit(values,actions){
      console.log({values,actions});
      // console.log(actions);
      try{
        const isAuth=true;
        if(isAuth){
          console.log("Authentication Successful");
          navigate('/')
        }
      }
      catch(err){
        alert(err);
      }
  }
  return (
    <div>
        <div className='mx-auto pt-10 w-full mt-14'>
            <div className='flex justify-center'>
                <div className=''>
                    <h1 className='text-2xl font-bold text-center'> Sign {isRegistered!=null ? 'Up' : 'in'}</h1>
                    <Link to={isRegistered!=null ? '/login' : '/register'}><p className='text-md text-center font-medium'>{isRegistered!=null ? 'Already have an' : 'Not created'} account</p></Link>
                    <Formik initialValues={isRegistered ? {...initialLoginDetails,username:''} : initialLoginDetails} onSubmit={submit}>
                      {
                        ()=>(
                          <>
                            {/* <FormErrors/> */}
                            <Form>
                              <fieldset className='flex flex-col'>
                              {
                                isRegistered!=null && <Field
                                 type='text'
                                  name='username'
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
                                <button type='submit' className='rounded-lg ml-auto bg-pink-400 p-4 mr-3'>Sign {isRegistered!=null ? 'up' : 'in'}</button>

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