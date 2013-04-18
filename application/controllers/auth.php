<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller
{
    public function session($provider)
    {
        $this->load->helper('url_helper');
       // $this->load->library('user_agent');

		$redirect_url = $this->input->get('origin', TRUE);

		if(!empty($redirect_url)) {
			$origin = array('redirect_url' => $redirect_url);
			$this->session->set_userdata($origin);
		}

        //$this->load->spark('oauth2/0.3.1');		

        $provider = $this->oauth2->provider($provider, array(
            'id' => config_item('mygov_oauth_id'),
            'secret' => config_item('mygov_oauth_secret'),
        ));

        if (!$this->input->get('code'))
        {
	
            // By sending no options it'll come back here
            redirect($provider->authorize(array('redirect_uri' => config_item('mygov_oauth_redirect'))));
        }
        else
        {
            // Howzit?
            try
            {
                
				$token = $provider->access($_GET['code'], array('redirect_uri' => config_item('mygov_oauth_redirect')));
				
                $user = $provider->get_user_info($token);

                // Here you should use this information to A) look for a user B) help a new user sign up with existing data.
                // If you store it all in a cookie and redirect to a registration page this is crazy-simple.

				$users_auth = array('provider_user_id' => $token->access_token, 
								   'token' => $token->access_token, 
								   'provider' => 'mygov');
								
				$user_data = array('user_data' => $user);								
								
					
			// No need to save to db now, so commenting this out
			//	if(!$this->check_user($user['nickname'])) {
			//		
			//		$user = array_merge($users_auth, $user_data);
			//		
			//		$this->db->insert('users_auth', $user);
			//	}
				
				//$this->db->insert('users_auth', $users_auth) ;
				
				$this->session->set_userdata($users_auth);	
				$this->session->set_userdata($user_data);					
				
				

				// if we don't already have this user, then direct to registration page with prefilled values (username, email if provided) - will need to check to see if username or email address are already in use too
				// if we already have this user then we make sure session variables are set and redirect them to their dashboard page. Every other page checks their session to make sure they're logged in and legit
				
				 $redirect_url = $this->session->userdata('redirect_url');
				 $redirect_url = (!empty($redirect_url)) ? $redirect_url : config_item('app_url');
				
				 redirect($redirect_url);


				/*
	                echo "<pre>Auth Data: \n\n";
	                var_dump($users_auth);

	                echo "<pre>User Data: \n\n";
	                var_dump($user_data);					

				*/

				
				

			 /* Save in a database for future use. */
			 // $_SESSION['oauth_access_token']	 		= $token['access_token'];
			 // $_SESSION['oauth_access_token_secret'] 	= $tokens['oauth_token_secret'];



            }

            catch (OAuth2_Exception $e)
            {
                show_error('That didnt work: '.$e);
            }

        }
    }

	public function check_user($username) {
			$query = $this->db->get_where('users_auth', array('username_url' => $username));

			return sizeof($query->row_array());	

	}
	
	
	

	public function logout() {
		$this->session->sess_destroy();
		redirect('/');
	}

	// need a function to check for login status, I think this can just verify the value of a session variable

}

?>
