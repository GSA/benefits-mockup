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

	
		$data = array('step' => 'step1');

		$this->load->view('mockup', $data);
	}

	public function page($step) {

		$step = (!empty($step)) ? $step : $this->input->get('step', TRUE);

		$data = array();
		$data['step'] = $step;

		$data['user'] = $this->session->userdata('user_data');

		$this->load->view('mockup', $data);

	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
