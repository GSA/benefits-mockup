<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * GitHub OAuth2 Provider
 *
 * @package    CodeIgniter/OAuth2
 * @category   Provider
 * @author     Phil Sturgeon
 * @copyright  (c) 2012 HappyNinjas Ltd
 * @license    http://philsturgeon.co.uk/code/dbad-license
 */

class OAuth2_Provider_Mygov extends OAuth2_Provider
{


	protected $scope = array('profile tasks notifications');


	/**
	 * @var  string  the method to use when requesting tokens
	 */
	public $method = 'POST';


	public function url_authorize()
	{
		return config_item('mygov_server') . '/oauth/authorize';
	}

	public function url_access_token()
	{
		return config_item('mygov_server') . '/oauth/authorize';
	}

	public function get_user_info(OAuth2_Token_Access $token)
	{
		$opts = array(
			'http' => array(
				'method' => 'GET',
				'header' => 'Authorization: Bearer '.$token->access_token
			)
		);
		$_default_opts = stream_context_get_params(stream_context_get_default());
		
		$opts = array_merge_recursive($_default_opts['options'], $opts);
		$context = stream_context_create($opts);
		$url = config_item('mygov_server') . '/api/profile';

		$user = json_decode(file_get_contents($url,false,$context));
			
		// Create a response from the request
		return array(
			'email' => $user->email,
			'title' => $user->title,
			'suffix' => $user->suffix,
			'first_name' => $user->first_name,
			'middle_name' => $user->middle_name,
			'last_name' => $user->last_name,
			'phone_number' => $user->phone_number,
			'mobile_number' => $user->mobile_number,
			'address' => $user->address,
			'address2' => $user->address2,
			'city' => $user->city,
			'state' => $user->state,			
			'date_of_birth' => $user->date_of_birth,
			'marital_status' => $user->marital_status,
			'gender' => $user->gender,
			'is_parent' => $user->is_parent,
			'is_retired' => $user->is_retired,
			'is_student' => $user->is_student,
			'is_veteran' => $user->is_veteran
		);
	}
}