{{-- This file is used to store sidebar items, inside the Backpack admin panel --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<li class="nav-item"><a class="nav-link" href="{{ backpack_url('terms') }}"><i class="nav-icon la la-question"></i> Terms</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('search-list') }}"><i class="nav-icon la la-question"></i> Search lists</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('last-activitie') }}"><i class="nav-icon la la-question"></i> Last activities</a></li>