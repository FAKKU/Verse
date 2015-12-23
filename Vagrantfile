# -*- mode: ruby -*-
# vi: set ft=ruby :

# Install some helpful Vagrant plugins.
required_plugins = %w(vagrant-vbguest)

plugins_to_install = required_plugins.select { |plugin| not Vagrant.has_plugin? plugin }
if not plugins_to_install.empty?
  puts "Installing plugins: #{plugins_to_install.join(' ')}"
  if system "vagrant plugin install #{plugins_to_install.join(' ')}"
    exec "vagrant #{ARGV.join(' ')}"
  else
    abort "Installation of one or more plugins has failed. Aborting."
  end
end

# Force Virtualbox for those people who have installed vagrant-lxc (e.g.)
ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

Vagrant.configure(2) do |config|
  # The box to use for the VM.
  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host.
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 8000, host: 8000

  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", ip: "10.0.1.10"

  # Share a folder from the host to the VM.
  config.vm.synced_folder ".", "/vagrant"

  config.vm.boot_timeout = 600

  # Customize VM Settings
  config.vm.provider "virtualbox" do |vb|
    vb.name = "FAKKU Verse"
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--hwvirtex", "on"]
    vb.customize ["modifyvm", :id, "--audio", "none"]
    vb.customize ["modifyvm", :id, "--nictype1", "virtio"]
    vb.customize ["modifyvm", :id, "--nictype2", "virtio"]
  end

  # Provision the VM
  config.vm.provision "shell", path: "provision/setup.sh"
end
