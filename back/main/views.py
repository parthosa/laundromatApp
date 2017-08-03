from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import *
from django.contrib.admin.views.decorators import staff_member_required
import uuid
from django.http import HttpResponseRedirect,Http404,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
import json
import datetime
from gcm import GCM

@csrf_exempt
def Register(request):
	if request.method == 'POST':
		email = json.loads(request.body)['email']
		gid = json.loads(request.body)['userId']
		print gid
		request.session['email'] = email
		request.session['gid'] = gid
		registered_emails = User.objects.all().values('username')
		domain_check = email.split('@')[1]
		if domain_check == 'pilani.bits-pilani.ac.in':
			if email in [ x['username'] for x in registered_emails]:
				user = authenticate(username = email, password = gid)
				print User.objects.get(username = email)
				if user:
					print "user"
					try:
						user_p = UserProfile.objects.get(user = User.objects.get(username = email))
					except:
						user = User.objects.get(username = email)
						print user
						user_p = UserProfile()
						user_p.name = json.loads(request.body)['displayName']
						user_p.uid = gid
						user_p.dp_url = json.loads(request.body)['imageUrl']
						user_p.user = user
						user_p.save()
						try:
							Device_ID.objects.create(device_id = json.loads(request.body)['device_id'], user = user_p)
							device_id = Device_ID.objects.get(user = user_p)
							user_p.device_id = device_id
							user_p.save()
						except:
							pass
					print user_p
					try:
						print 1
						device_id = Device_ID.objects.get(user = user_p)
						#device_id.delete()
						#Device_ID.objects.create(device_id = json.loads(request.body)['device_id'], user = user_p)
						#device_id = Device_ID.objects.get(user=user_p)
						device_id.device_id = json.loads(request.body)['device_id']
						device_id.save()
						user_p.device_id = device_id
						print 1
						print device_id
						user_p.save()
					except:
						try:
							Device_ID.objects.create(device_id = json.loads(request.body)['device_id'], user = user_p)
							device_id = Device_ID.objects.get(user = user_p)
							# user_p.save()
							# user_p.device_id.add(device_id)
							user_p.device_id = device_id
							user_p.save()
						except:
							pass
					if user_p.bits_id == None:
						login(request, user)
						return JsonResponse({'status': 2, 'message': 'Successfully logged in', 'session_key': request.session.session_key})
					else:
						login(request, user)
						return JsonResponse({'status': 1, 'message': 'Successfully logged in', 'session_key': request.session.session_key})
				else:
					return JsonResponse({'status': 0})
			else:
				User.objects.create_user(username = email, password = gid)
				user = User.objects.get(username = email)
				print user
				user_p = UserProfile()
				# user_p.bits_id = json.loads(request.body)['bits_id']
				user_p.name = json.loads(request.body)['displayName']
				# hostel = Hostel.objects.get(short = json.loads(request.body)['hostel'])
				# user_p.hostel = hostel
				# user_p.room = json.loads(request.body)['room_num']
				# user_p.apply_date = json.loads(request.body)['appy_date']
				# user_p.phone = json.loads(request.body)['phone']
				user_p.uid = gid
				# user_p.dp = request.FILES['dp']
				# user = User.objects.get(username = email)
				user_p.dp_url = json.loads(request.body)['imageUrl']
				user_p.user = user
				user_p.save()
				try:
					Device_ID.objects.create(device_id = json.loads(request.body)['device_id'], user = user_p)
					device_id = Device_ID.objects.get(user = user_p)
					user_p.device_id = device_id
					user_p.save()
				except:
					pass
				# hostel.user.add(user_p)
				# hostel.save()
				print user
				user_l = authenticate(username = email, password = gid)
				login(request, user_l)

				return JsonResponse({'status':2, 'message': 'User saved Successfully','session_key': request.session.session_key})
		else:
			return JsonResponse({'status': 0, 'message': 'Please login with your BITS mail'})

@csrf_exempt
def get_plans(request):
	washes_list = []
	print 1
	plans = Plan.objects.all()
	for wash in plans:
		if wash.with_iron:
			iron_string = " iron"
		else:
			iron_string = "out iron"
		washes_list.append({"plan_num": wash.plan_num, "plan_name": str(wash.washes)+" washes with"+iron_string+" @Rs "+str(wash.price)})
	return JsonResponse({"plans_list": washes_list, "status": 1})

@csrf_exempt
def additional_info(request):
	if request.method == "POST":
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		try:
			hostel = Hostel.objects.get(short = req_ob['hostel'])
			user_p.hostel = hostel
			user_p.room = int(req_ob['room_no'])
			plan = Plan.objects.get(plan_num = int(req_ob['plan_num']))
			user_p.plan = plan
			user_p.total_washes = plan.washes
			# user_p.apply_date = req_ob['apply_date']
			user_p.phone = int(req_ob['phone'])
			user_p.bag_num = req_ob['bag_num']
			user_p.bits_id = req_ob['bits_id']
			hostel.user.add(user_p)
			hostel.save()
			user_p.save()
			user.is_active = True
			user.save()
			return JsonResponse({'status': 1, 'message': 'Profile created successfully'})
		except:
			return JsonResponse({'status': 0, 'message': 'Kindly fill all the required fields'})


@csrf_exempt
def edit_profile(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		hostel = Hostel.objects.get(short = req_ob['hostel'])
		user_p.hostel = hostel
		user_p.room = int(req_ob['room_no'])
		user_p.phone = int(req_ob['phone'])
		user_p.bits_id = req_ob['bits_id']
		user_p.bag_num = req_ob['bag_num']
		user_p.save()
		return JsonResponse({'status': 1, 'message': 'Profile saved successfully'})

@csrf_exempt
def student_logout(request):
	logout(request)
	return JsonResponse({'status': 1, 'message': 'You have been successfully logged out'})


# isko dekh lena thoda...not applied cases me error aa rha hai
@csrf_exempt
def Profile(request):
	if request.method == 'POST':
		session_key = json.loads(request.body)['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		user_data = {}
		user_data['name'] = user_p.name
		user_data['imageUrl'] = user_p.dp_url
		user_data['bits_id'] = user_p.bits_id
		user_data['phone'] = user_p.phone
		print user_p.hostel
		user_data['hostel'] = user_p.hostel.short
		user_data['room_no'] = user_p.room
		user_data['email'] = user.username
		user_data['apply_date'] = user_p.apply_date
		user_data['bag_num'] = user_p.bag_num
		# if not applied uska ?
		if user_p.plan != None:
			user_data['has_applied'] = True
			user_data['plan_num'] = user_p.plan.plan_num
			user_data['with_iron'] = user_p.plan.with_iron
			user_data['washes'] = user_p.plan.washes
			print user_p.wash_history.count()
			user_data['washes_left'] = user_p.total_washes - user_p.wash_history.count()
		else:
			user_data['has_applied'] = False

		if user_p.present_wash:
			user_data['status'] = user_p.present_wash.status.name
			user_data['date'] = user_p.present_wash.date

		return JsonResponse({'status': 1, 'user_data':user_data})

@csrf_exempt
def wash_history(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = user)
		washes = Wash.objects.filter(user=user_p).order_by('id')

		washes_list = []
		# wash_num = 1
		for wash in washes:
			washes_list.append({'number': wash.number, 'date': wash.date, 'status': wash.status.name,'status_number': wash.status.number,'with_iron':user_p.plan.with_iron})
		print washes_list
		return JsonResponse({'status': 1,'washes_list':washes_list})


@csrf_exempt
def track_status(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = user)
		present_wash = {}
		if user_p.present_wash:
			present_wash['status_number'] = user_p.present_wash.status.number
			present_wash['number'] = user_p.present_wash.number
			present_wash['date'] = user_p.present_wash.date
		present_wash['with_iron']=user_p.plan.with_iron
		return JsonResponse({'status': 1,'present_wash':present_wash})

@csrf_exempt
def signin_laundro(request):
	if request.method == 'POST':
		email = json.loads(request.body)['email']
		password = json.loads(request.body)['password']
		user = authenticate(username = email, password = password)
		if user:
			if user.is_staff:
				# user_p = UserProfile.objects.get(user = user)
				login(request,user)
				return JsonResponse({'status': 1,'message':'Login Successful'})
			else:
				return JsonResponse({'status': 0,'message':'Not Authorized'})
		else:
			return JsonResponse({'status': 0,'message':'Invalid Credentials'})


@csrf_exempt
def scan_laundro(request):
	if request.method == 'POST':
		# gid = json.loads(request.body)['uid']
		bits_id = json.loads(request.body)['bag_num']
		try:
			user_p = UserProfile.objects.get(bag_num = bits_id)
		except:
			return JsonResponse({"status": 0, "message": "The bag number does not exist"})
		user_data = {}
		user_data['name'] = user_p.name
		user_data['imageUrl'] = user_p.dp_url
		user_data['bits_id'] = user_p.bits_id
		user_data['phone'] = user_p.phone
		user_data['hostel'] = user_p.hostel.short
		user_data['room_no'] = user_p.room
		user_data['email'] = request.user.username
		if user_p.plan != None:
			user_data['plan_num'] = user_p.plan.plan_num
			user_data['with_iron'] = user_p.plan.with_iron
			user_data['washes'] = user_p.plan.washes
			user_data['apply_date'] = user_p.apply_date
			try:
				user_data['status_number'] = user_p.present_wash.status.number
				user_data['date'] = user_p.present_wash.date
				user_data['number'] = user_p.present_wash.number
			except:
				user_data['status_number'] = 0
			user_data['washes_left'] = user_p.plan.washes - user_p.wash_history.count()
		else:
			user_data['has_applied'] = False
		return JsonResponse({'status': 1, 'user_data':user_data})

@csrf_exempt
def change_status(request):
	if request.method == 'POST':
		bits_id = json.loads(request.body)['bag_num']
		user_p = UserProfile.objects.get(bag_num = bits_id)
		status = Status.objects.get(number = int(json.loads(request.body)['status_number']))
		if user_p.num_washes >= user_p.total_washes:
			return JsonResponse({"status": 0, "message": "The user has no more washes left"})
		else:
			if int(json.loads(request.body)['status_number']) == 1:
				date = datetime.date.today().strftime("%d/%m/%Y")
				wash = Wash.objects.create(user = user_p, status = status, date = date, number = int(json.loads(request.body)['washes']))
				user_p.wash_history.add(wash)
				user_p.present_wash = wash
				# user_p.num_washes+=1
				user_p.save()
			else:
				present_wash = user_p.present_wash
				present_wash.status = status
				present_wash.save()
				user_p.save()
				if present_wash.status == 4:
					gcm = GCM('AAAA2PKqMCk:APA91bGa11EhfPWdotLIb7LheIZSUFZoh_iJ7Vn7j-q5XeBudpKNua0bEKibTJMBOeIV3D7OYbGtgi5xNUWbi88RFCb-5VdAEzIfKMBDEOq0G0wHNBQ9GfFaVXJt-B_6f17M-_heKqwA')
					device_to_send = user_p.device_id.all().values("device_id")
					notification = {'title': 'Wash Completed', 'message': "Your wash has been completed", 'additionalData': {'isUser': 'isUser'}}
					response = gcm.json_request(registration_ids=device_to_send, data=notification)
					print response
				print user_p.present_wash.status,status

			response = {'status': 1, 'message': 'Successfully updated status'}
			return JsonResponse(response)

@csrf_exempt
def get_students(request):
	if request.method == 'POST':
		hostel = Hostel.objects.get(name = json.loads(request.body)['hostel'])
		students = UserProfile.objects.filter(hostel = hostel)
		print students
		# students = hostel.user.all()
		response_list = []
		for student in students:
			if student.plan:
				response_list.append({'name': student.name, 'bits_id': student.bits_id, 'room_no': student.room,'plan': student.plan.plan_num})
			else:
				response_list.append({'name': student.name, 'bits_id': student.bits_id, 'room_no': student.room})

		return JsonResponse({'status': 1, 'students': response_list})

@csrf_exempt
def get_student_info(request):
	if request.method == "POST":
		student = UserProfile.objects.get(bits_id = json.loads(request.body)['bits_id'])
		wash_items = []
		wash_history = Wash.objects.filter(user = student)
		for wash in wash_history:
			wash_items.append({'date': wash.date, 'number': wash.number})
		info = {'name': student.name, 'bits_id': student.bits_id, 'email': student.user.username, 'room_no': student.room, 'phone': room.phone, 'hostel': room.hostel, 'plan_num': student.plan.plan_num, 'date': student.present_wash.date, 'washes_left': student.total_washes - student.wash_history.count(), 'washItems': wash_items, 'imageUrl': student.dp_url}
		if student.present_wash:
			info['status'] = student.present_wash.status.name
			info['date'] = student.present_wash.date

@csrf_exempt
def get_hostels(request):
	hostels = Hostel.objects.all()
	hostels_list = []

	for hostel in hostels:
		hostels_list.append({'name':hostel.name,'short':hostel.short})

	return JsonResponse({'status': 1, 'hostels': hostels_list})

@csrf_exempt
def add_washes(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = user)
		user_p.total_washes+=int(req_ob['num_washes'])
		user_p.save()

	return JsonResponse({'status': 1, 'message': str(req_ob['num_washes'])+' washes added'})

@csrf_exempt
def push_notif(request):
	if request.method == "POST":
		gcm = GCM('AAAA2PKqMCk:APA91bGa11EhfPWdotLIb7LheIZSUFZoh_iJ7Vn7j-q5XeBudpKNua0bEKibTJMBOeIV3D7OYbGtgi5xNUWbi88RFCb-5VdAEzIfKMBDEOq0G0wHNBQ9GfFaVXJt-B_6f17M-_heKqwA')
		device_to_send = []
		message = req_ob['message']
		notification = {'title': 'New message', 'message': message, 'additionalData': {'isUser': 'isUser'}}
		if req_ob['all_hostels'] == "true":
			device_to_send = [x.device_id for x in Device_ID.objects.all()]
			response = gcm.json_request(registration_ids=device_to_send, data=notification)
		else:
			try:
				hostel = req_ob['hostel']
				users = [x.user for x in Hostel.objects.get(short = hostel)]
				for user in users:
					device_to_send.append(user.device_id.all().values("device_id"))
			except KeyError:
				bag_num = req_ob['bag_num']
				user_p = UserProfile.objects.get(bag_num = bag_num)
				device_to_send = user_p.device_id.all().values("device_id")

			response = gcm.json_request(registration_ids=device_to_send, data=notification)
		return JsonResponse({'status': 1, 'message': 'notification successfully sent'})

@csrf_exempt
def get_app_version(request):
	app_version = App_version.objects.get(pk = 1)
	return JsonResponse({'status':1,'app_version':app_version.version_number})
