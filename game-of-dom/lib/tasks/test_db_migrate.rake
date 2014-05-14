namespace :db do 
  desc "Migrates development and test databases" 
  task :migrate do 
    puts "Migrating development database" 
    Rake::Task["db:migrate"].invoke 
    
    puts "Migrating test database" 
    Rake::Task["db:test:clone"].invoke 
    puts "Test migration complete" 
  end 
end