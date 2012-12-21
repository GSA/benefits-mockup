<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mockup extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{

	
		//$data = array('step' => 'step1');
		$data = array();

		$this->load->view('mockup', $data);
	}

	public function page($step = null) {

		if ((empty($step))) $step = $this->input->get('step', TRUE);
		if ((empty($step))) $step = 'step1';

		$data = array();
		$data['step'] = $step;

		$data['user'] = $this->session->userdata('user_data');

		$this->load->view('mockup', $data);

	}
	
	public function save_tasks($tasks = null) {
		
		$tasks = 'task[name]=Change%20your%20name&task[task_items_attributes][][name]=[FILTERED]&task[task_items_attributes][][url]=http://www.socialsecurity.gov/online/ss-5.pdf';
		
		$access_token = $this->session->userdata('token');
		
		$opts = array(
			'http' => array(
				'method' => 'POST',
				'header' => "Content-type: application/x-www-form-urlencoded\r\n" . 
							'Authorization: Bearer '.$access_token, 
				'content' => $tasks
			)
		);
		$_default_opts = stream_context_get_params(stream_context_get_default());
		
		$opts = array_merge_recursive($_default_opts['options'], $opts);
		$context = stream_context_create($opts);
		$url = 'https://staging.my.usa.gov/api/tasks';

		$save = json_decode(file_get_contents($url,false,$context));

		return $save;		
		
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
